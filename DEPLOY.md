# Deploying to AWS

The site is fully static: a Vite/React bundle plus a generated `api/profile.json`.
It runs on **S3 (private origin) + CloudFront (CDN + TLS) + Route 53 (DNS) + ACM
(free certificate)**. There is no server to run, patch, or pay for.

All infrastructure lives in [infra/site.yaml](infra/site.yaml) (CloudFormation),
and publishing is [scripts/deploy.sh](scripts/deploy.sh).

---

## One-time setup

### 1. Install and configure the AWS CLI

```bash
brew install awscli          # or: https://aws.amazon.com/cli/
aws configure                # access key, secret, default region
aws sts get-caller-identity  # should print your account id
```

The account you use needs permission to create S3, CloudFront, ACM, Route 53 and
CloudFormation resources. An admin user (or `AdministratorAccess`) is simplest for
the initial stack; the day-to-day deploy only needs S3 write + CloudFront
invalidation.

### 2. Get a Route 53 hosted zone for your domain

CloudFront needs Route 53 to hold the DNS records and to auto-validate the
certificate.

**If you bought the domain through Route 53**, the zone already exists:

```bash
aws route53 list-hosted-zones-by-name --dns-name example.com \
  --query 'HostedZones[0].[Name,Id]' --output text
```

**If you bought it elsewhere** (GoDaddy, Namecheap, Cloudflare, …), create a zone
and point the registrar at it:

```bash
# Create the zone (the caller-reference just needs to be unique)
aws route53 create-hosted-zone --name example.com --caller-reference "$(date +%s)"

# Read the four nameservers AWS assigned
aws route53 get-hosted-zone --id /hostedzone/Z123EXAMPLE \
  --query 'DelegationSet.NameServers' --output text
```

Then, in your registrar's control panel, replace the existing nameservers with
those four. Propagation usually takes 15 minutes to a few hours. Verify with:

```bash
dig +short NS example.com
```

Wait until that returns the AWS nameservers before the next step — the
certificate cannot validate until DNS delegation is live.

Take note of the hosted zone id (the `Z...` part, without the `/hostedzone/`
prefix).

### 3. Create the stack

The stack **must** go in `us-east-1` — CloudFront only reads certificates from
that region. The site itself is still served worldwide from CloudFront edges.

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name portfolio-site \
  --template-file infra/site.yaml \
  --parameter-overrides DomainName=example.com HostedZoneId=Z123EXAMPLE
```

This takes **15–40 minutes**, almost all of it waiting on certificate validation
and CloudFront propagation. It is normal for it to sit at
`CREATE_IN_PROGRESS` on `Certificate` for a while.

If it fails, see [Troubleshooting](#troubleshooting) below.

### 4. Publish the site

```bash
npm run deploy
```

That builds the client, uploads it, and invalidates the CDN cache. It reads the
bucket name and distribution id from the stack outputs, so there is nothing to
configure.

### 5. Check it

```bash
curl -sI https://example.com | head -3            # 200
curl -s https://example.com/api/profile.json | head -c 80
curl -sI https://www.example.com | head -3        # 301 to the apex
curl -sI http://example.com | head -3             # 301 to https
```

Then open `https://example.com` in a browser. If DNS is still propagating you can
test the CloudFront hostname directly:

```bash
aws cloudformation describe-stacks --stack-name portfolio-site --region us-east-1 \
  --query "Stacks[0].Outputs" --output table
```

---

## Day-to-day: updating the site

Edit content in [server/data/profile.js](server/data/profile.js) or the components
under [client/src/](client/src/), then:

```bash
npm run deploy
```

Typically under a minute. Fingerprinted files in `assets/` are cached for a year;
`index.html`, `api/profile.json` and the CV PDF use a 5-minute TTL plus a full
CloudFront invalidation on every deploy, so changes go live immediately.

Local development is unchanged:

```bash
npm run dev:client   # http://localhost:5173
```

---

## What the template creates

| Resource | Purpose |
| --- | --- |
| S3 bucket `<domain>-site` | Private origin. No public access; versioned, with old versions expiring after 30 days. |
| Origin Access Control | Lets only this CloudFront distribution read the bucket. |
| ACM certificate | Free TLS for the apex and `www`, DNS-validated automatically, auto-renewing. |
| CloudFront distribution | Global CDN, HTTP/2 + HTTP/3, gzip/brotli, forced HTTPS, SPA fallback for unknown paths. |
| CloudFront Function | 301 redirect from `www.example.com` to the apex. |
| Response headers policy | HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, referrer policy. |
| Route 53 records | A + AAAA aliases for the apex and `www`. |

The bucket is set to `Retain`, so deleting the stack will not delete your files.

### Expected cost

At portfolio traffic (a few thousand visits a month) this lands around
**$0.50–1.00/month**, mostly the Route 53 hosted zone at $0.50. S3 storage for a
~200 KB site is a fraction of a cent, and CloudFront's free tier covers 1 TB of
egress and 10M requests per month. The domain renewal is separate.

---

## Troubleshooting

**Stack stuck on `Certificate` for over 30 minutes.** DNS delegation is not live.
Confirm `dig +short NS example.com` returns AWS nameservers and that you passed
the hosted zone that is actually authoritative for the domain.

**`Certificate` fails with a validation error.** Usually a mismatched zone —
double-check `HostedZoneId` belongs to `DomainName`. Delete the failed stack and
re-run step 3.

**`BucketAlreadyExists`.** S3 bucket names are globally unique. Either you already
created it (bucket is `Retain`, so it survives stack deletion — reuse or delete it
manually) or someone else holds the name. Change `BucketName` in the template if
needed.

**`CNAMEAlreadyExists`.** Another CloudFront distribution in some account already
claims this domain as an alias. Remove it there first.

**Site shows an old version.** The deploy invalidates `/*` and waits for it to
complete, so this is almost always browser cache — hard-reload.

**"Could not load profile" error page.** `api/profile.json` did not upload. Check
`aws s3 ls s3://<bucket>/api/` and re-run `npm run deploy`.

---

## Notes and optional cleanups

- **The Express server is no longer part of the deploy.**
  [server/index.js](server/index.js) is unused in production — the client fetches
  the static `api/profile.json` instead. You can delete `server/index.js`,
  `server/package.json` and the `dev:server`/`start` scripts if you want, but
  **keep [server/data/profile.js](server/data/profile.js)**: it is still the
  single source of truth that [scripts/gen-profile.mjs](scripts/gen-profile.mjs)
  compiles into JSON at build time. (Moving that file somewhere more honestly
  named, like `content/profile.js`, would be a reasonable follow-up.)
- **Unknown paths return `index.html` with a 200**, which suits a single-page site
  but means genuinely missing URLs are not reported as 404s to search engines. If
  you later add routing or care about that, change `CustomErrorResponses` in the
  template.
- **Automating deploys.** If you put this in a Git repo, the natural next step is
  a GitHub Actions workflow using an IAM role with OIDC (no long-lived keys) that
  runs the same `scripts/deploy.sh` on push to `main`.
