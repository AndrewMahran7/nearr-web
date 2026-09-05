# Nearr — Marketing Website

The public marketing site for **Nearr**, an iOS app that turns places you see
in Instagram, TikTok, and Facebook videos into a real-world map. **Vayrin**
is Nearr's place-finding companion — send him a video and he identifies the
location, even when a creator never names it. See "Vayrin brand" below for
the full positioning and the asset manifest for launch-ready artwork.

This is an **independent repository**, separate from the Nearr app repo. It
does not import from, depend on, or modify the app codebase. A handful of
brand assets (the real app icon, confirmed brand colors, and copy pulled
from internal docs) were copied in during the initial build — see
"Product assets" below for exactly what and from where.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (CSS-first config, see `src/app/globals.css`)
- No backend, no auth, no database — this is a static/edge-rendered
  marketing site. It does not call the production Nearr backend.

## Local development

```powershell
npm install
npm run dev
```

Then open http://localhost:3000.

```powershell
npm run build   # production build — must succeed before shipping changes
npm run start   # serve the production build locally
npm run lint     # ESLint
```

## Project structure

```
src/
  app/                    routes (App Router)
    page.tsx              homepage
    privacy/ terms/ support/
    c/[creator]/          creator landing pages (/c/<slug>)
    place/[id]/           future Nearr place-link fallback (/place/<id>)
    sitemap.ts robots.ts opengraph-image.tsx
    icon.png apple-icon.png   real Nearr app icon, resized
  components/
    layout/                Header, Footer
    sections/               homepage sections (Hero, Vayrin demo, etc.)
    ui/                    small shared primitives (buttons, headings)
    legal/                 Privacy/Terms/Support page chrome
  lib/
    config.ts              App Store URL / support email — see below
    attribution.ts, attribution.server.ts   creator/campaign attribution contract
    analytics.ts            analytics event interface (no vendor wired up yet)
    useReveal.ts, useSectionView.ts   small scroll-triggered hooks
  proxy.ts                  captures attribution into a cookie on every request
                             (Next.js 16 renamed "Middleware" to "Proxy" — same thing)
```

## Where things are configured

- **App Store URL**: `src/lib/config.ts` → `APP_STORE_URL`, defaulting to the
  verified live listing `https://apps.apple.com/us/app/nearr/id6764170112`.
  Override with `NEXT_PUBLIC_APP_STORE_URL` only when Apple changes the
  canonical destination. The value is validated as an HTTPS Apple URL.
- **Support email**: `src/lib/config.ts` → `SUPPORT_EMAIL`, defaulting to
  `andrew.mahran@icloud.com`. Override with `NEXT_PUBLIC_SUPPORT_EMAIL` after
  the branded inbox is ready. The temporary value matches the legal repo.
- **Site URL** (metadata, canonicals, sitemap, and robots):
  `src/lib/config.ts` → `siteConfig.url`. Local and unconfigured builds use
  `http://localhost:3000`, omit canonicals, publish an empty sitemap, and
  disallow indexing. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production
  origin in hosting; path/query/hash values fail validation. Do not use
  `nearr.app`: as of 2026-08-24 it belongs to an unrelated product.
- Copy `.env.example` to a local ignored env file only when overrides are
  needed. These are public values and must never contain secrets.

## Attribution contract

Creator/campaign links need to survive navigation across the site, not just
land on `/` and get dropped. The contract:

1. **Recognized query params**: `utm_source`, `utm_medium`, `utm_campaign`,
   `utm_content`, `utm_term`, `creator`, `video`, `campaign`, `source`, `ref` (see
   `src/lib/attribution.ts` → `ATTRIBUTION_PARAM_KEYS`).
2. **Capture**: `src/proxy.ts` runs on every request. If any recognized
   param is present, it's merged into a first-party cookie
   (`nearr_attribution`, 90-day expiry, `SameSite=Lax`). Visiting
   `/c/<creator>` also tags `creator=<slug>` automatically, even without an
   explicit `?creator=` query param (an explicit query param still wins).
   Later touches merge on top of earlier ones; `capturedAt` records the
   first-touch timestamp and is never overwritten.
3. **Read**: `getClientAttribution()` (client components) or
   `getServerAttribution()` (Server Components / Route Handlers, in
   `src/lib/attribution.server.ts`).
4. **Forwarding to analytics**: every call to `track()` in
   `src/lib/analytics.ts` automatically merges in the current attribution,
   so no call site has to look it up separately.

No analytics backend is wired up yet — `track()` currently just
`console.debug`s in development. When a vendor or first-party endpoint is
chosen, that's the one function to change (see the `TODO` inside it). Events
already defined: `landing_view`, `app_store_cta_clicked`,
`vayrin_section_viewed`, `vayrin_demo_interacted`, `save_flow_section_viewed`,
`map_section_viewed`, `creator_landing_viewed`.

## Future-route readiness

- **Creator landing pages** (`/c/<creator>`): implemented today at
  `src/app/c/[creator]/page.tsx`. Renders the same homepage story with a
  small "via @creator" banner and tags attribution automatically. Per-creator
  copy/imagery can be layered in later without changing the route contract.
- **Nearr place links** (`/place/<id>`): implemented today at
  `src/app/place/[id]/page.tsx` as a fallback page (`noindex`) — Nearr
  doesn't yet support sharing a place link (only the original social video),
  so there's no backend to fetch place data from. The page attempts the
  `nearr://place/<id>` app deep link (confirmed URL scheme, from the app's
  `app.config.js`) on iOS and otherwise shows a generic, always-correct
  fallback with the App Store CTA. When a place-fetching API exists, this
  route is where it plugs in.

## Adding testimonials

`src/components/sections/Testimonials.tsx` renders nothing while its
`TESTIMONIALS` array is empty because no approved, attributable customer quote
is checked into the project. To add one, get
**explicit, in-writing approval** from the person quoted to use their words
in marketing, then add `{ quote, name, handle }` to the array.

## Product assets reused from the Nearr app repo

Copied in (not referenced by path — the app repo is untouched and this repo
has no dependency on it):

- `src/app/icon.png`, `src/app/apple-icon.png`, `public/brand/app-icon-*.png`
  — resized from the real Nearr app icon (`assets/icon.png` in the app repo).
- Brand colors in `src/app/globals.css` use the canonical Vayrin system:
  cream `#F4F2EF`, charcoal `#0F1014`, and Nearr orange `#FF6A1A`.
- The hero and recognition gallery use real frames extracted from five public
  source videos in Nearr's labeled evaluation corpus. Product flow,
  share-sheet, map, and reminder visuals remain lightweight website
  compositions grounded in current app behavior.

## Vayrin brand

**Vayrin is Nearr's place-finding companion — not a separate app.** Product
hierarchy: Vayrin *finds*; Nearr *remembers* (the map, saves, nearby
reminders). Tagline: **"Just ask Vayrin."**, used once in the hero.

`src/components/ui/VayrinAvatar.tsx` is a small SVG stand-in for the
character (off-white shell, near-black face, Nearr-orange discovery-star
mark — the reference boards' "Orange Core" direction, chosen because it's
already Nearr's shipping accent rather than the alternate purple
exploration). It renders three expression states (`neutral`, `searching`,
`found`) matching how the reference boards themselves use a simplified
round avatar in chat bubbles and notification mockups, not the full
illustrated body. No approved shared full-body export currently exists in the
brand repository, so the site does not create a separate competing character
render. See `docs/VAYRIN_ASSET_MANIFEST.md` for the current asset status.

## Legal pages — canonical source of truth

**[`AndrewMahran7/nearr-legal`](https://github.com/AndrewMahran7/nearr-legal)
is the canonical source of truth for Nearr's public legal text**
(`privacy.md`, `terms.md`, `support.md`, all lowercase — don't rename them).
`src/app/privacy/page.tsx`, `terms/page.tsx`, and `support/page.tsx` are a
manually-kept, styled JSX mirror of that repo's content. There's no
automated sync — when the legal repo changes, update these three files to
match by hand. Keep the substance identical; only the markup differs.

## Media readiness

Five public-source recognition frames are live and truthfully mapped to exact
places. Their URLs, evaluation evidence, and extraction timestamps are in
`docs/WEBSITE_DEMO_GROUND_TRUTH.md`. The map and how-it-works images are
optimized WebPs with source originals retained under `assets/originals/`,
outside the served `public/` tree. See `docs/WEBSITE_ASSET_REPORT.md` for the
production weight and provenance summary.

## Production hosting

The site is hosted on Vercel as the `nearr-web` project. The GitHub repository
is connected with `main` as the Production branch; other branches receive
Preview deployments. The canonical origin is `https://nearrapp.com`, and
`www.nearrapp.com` permanently redirects to it.

See [`docs/HOSTING.md`](docs/HOSTING.md) for the build, environment, domain,
deployment, verification, and rollback runbook. No analytics vendor or secret
configuration is present.
