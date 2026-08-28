#!/usr/bin/env bash
# Builds the client and publishes it to S3 + CloudFront.
# Reads the bucket and distribution id straight out of the CloudFormation stack,
# so there is nothing to keep in sync by hand.
set -euo pipefail

STACK_NAME="${STACK_NAME:-portfolio-site}"
# CloudFront certificates live in us-east-1, so the stack does too.
REGION="${AWS_REGION:-us-east-1}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/client/dist"

need() { command -v "$1" >/dev/null 2>&1 || { echo "error: $1 is not installed" >&2; exit 1; }; }
need aws
need npm

stack_output() {
  aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}

echo "==> Reading stack outputs from $STACK_NAME ($REGION)"
BUCKET="$(stack_output BucketName)"
DISTRIBUTION_ID="$(stack_output DistributionId)"

if [[ -z "$BUCKET" || "$BUCKET" == "None" ]]; then
  echo "error: could not read BucketName from stack '$STACK_NAME'." >&2
  echo "       Deploy infra/site.yaml first (see DEPLOY.md)." >&2
  exit 1
fi

echo "==> Building client"
npm --prefix "$ROOT" run build

[[ -f "$DIST/index.html" ]] || { echo "error: $DIST/index.html missing after build" >&2; exit 1; }

# Vite fingerprints everything in assets/, so those files can be cached forever.
echo "==> Uploading hashed assets to s3://$BUCKET/assets"
aws s3 sync "$DIST/assets" "s3://$BUCKET/assets" \
  --region "$REGION" --delete \
  --cache-control 'public,max-age=31536000,immutable'

# index.html, the profile JSON and the CV are not fingerprinted, so they get a
# short TTL and rely on the invalidation below.
echo "==> Uploading unhashed files to s3://$BUCKET"
aws s3 sync "$DIST" "s3://$BUCKET" \
  --region "$REGION" --delete --exclude 'assets/*' \
  --cache-control 'public,max-age=300'

echo "==> Invalidating CloudFront cache"
INVALIDATION_ID="$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" --paths '/*' \
  --query 'Invalidation.Id' --output text)"

echo "==> Waiting for invalidation $INVALIDATION_ID"
aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION_ID" --id "$INVALIDATION_ID"

echo "==> Live at $(stack_output SiteUrl)"
