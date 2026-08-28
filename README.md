# Wilson Li — portfolio

Personal portfolio site. React front end (Vite), content compiled to a static JSON
file at build time — no backend needed to serve it.
Visual direction follows the "sunny." reference screenshots: dual dark/light theme,
portal intro, gradient accents, mono detail type, rounded cards.

## Run it

```bash
cd ~/Documents/portfolio
npm run setup          # installs client + server dependencies (once)
npm run dev:client     # site on http://localhost:5173
```

Production build:

```bash
npm run build          # output in client/dist, fully static
```

## Deploy it

S3 + CloudFront + Route 53 on AWS. See **[DEPLOY.md](DEPLOY.md)** for first-time
setup; after that it is one command:

```bash
npm run deploy
```

## URL switches

| URL | Effect |
| --- | --- |
| `/` | portal intro, then the site (portal shows once per browser tab) |
| `/?skip` | straight to the site, no portal |
| `/?theme=light` | force light mode for this visit |
| `/?theme=dark` | force dark mode for this visit |

The theme toggle in the header persists to `localStorage`, and `index.html` applies it
before first paint so there is no flash of the wrong theme.

## Editing content

Every word lives in **`server/data/profile.js`**. Change it there and reload —
`scripts/gen-profile.mjs` compiles it into `client/public/api/profile.json` on every
`dev:client` and `build`, which is what the app fetches.

- `hero.roles` — the phrases typed and deleted after "I'm". Keep them short.
- `hero.terminal.commands` — the commands typed into the terminal line.
- `hero.status` — the text next to the green pulsing dot.
- `projects.items[].emoji` / `.accent` — the card's emoji tile and accent colour.
  Accent is one of `cyan`, `violet`, `orange`, `pink`.
- `projects.items[].deliveries` — the ball-by-ball bar sequence on the cricket card.
  Characters are `0`–`6` for runs and `W` for a wicket; bar height encodes runs.
- `experience.roles[].months` — shown as a pill; keep it in sync with the dates.

Your CV is served from `client/public/wilson-li-cv.pdf`. Replace that file to update
the download link.

## Structure

```
portfolio/
├── infra/site.yaml              CloudFormation: S3 + CloudFront + Route 53 + ACM
├── scripts/
│   ├── gen-profile.mjs          profile.js → client/public/api/profile.json
│   └── deploy.sh                build, upload to S3, invalidate CloudFront
├── client/
│   ├── public/wilson-li-cv.pdf
│   └── src/
│       ├── App.jsx              theme + portal state, fetches /api/profile.json
│       ├── styles.css           all tokens and styling, both themes
│       ├── hooks/useTypewriter.js
│       └── components/
│           ├── Portal.jsx       rotating-arc intro with the ENTER orb
│           ├── Starfield.jsx    canvas specks behind the hero
│           ├── Nav.jsx          wordmark, theme toggle, mobile drawer
│           ├── Hero.jsx         status, name, role rotator, terminal line
│           ├── Projects.jsx     snap carousel with arrows and pills
│           └── SectionHead / About / Experience / Skills / Contact / Reveal
└── server/
    ├── index.js                 legacy local-only Express host, not deployed
    └── data/profile.js          ← all site content
```

## Design tokens

- Accents shared by both themes: orange `#F0A03C`, pink `#E0538F`, violet `#7B5CFF`,
  cyan `#4EC5EC`, green `#3ED598`. The gradient is orange → pink → violet.
- Dark: background `#080A11`, cards are translucent white over it.
  Light: background `#F1F2F7`, cards are solid white.
- Type: Plus Jakarta Sans 800 for display, Inter for body, JetBrains Mono for
  eyebrows, terminal, chips and data labels.
- Motion: portal arcs, starfield drift, typewriter, carets, scroll reveals and card
  hovers all stop under `prefers-reduced-motion: reduce`.
