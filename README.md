# Nearr — Marketing Website

The public marketing site for **Nearr**, an iOS app that turns places you see
in Instagram/TikTok videos into a real-world map — including "Shazam for
places," identifying locations even when a creator never names them.

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
    c/[creator]/          creator landing pages (nearr.app/c/<slug>)
    place/[id]/           future Nearr place-link fallback (nearr.app/place/<id>)
    sitemap.ts robots.ts opengraph-image.tsx
    icon.png apple-icon.png   real Nearr app icon, resized
  components/
    layout/                Header, Footer
    sections/               homepage sections (Hero, Shazam demo, etc.)
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

- **App Store URL**: `src/lib/config.ts` → `APP_STORE_URL`. Currently `null`
  — no App Store Connect URL exists yet (the app isn't live on the App
  Store; see `docs/CHECKLIST_UPDATED_2026-08-15.md` in the app repo, which
  put it at "Stage 0", pre-launch, as of 2026-08-15). Until set, the
  `AppStoreButton` component still renders normally but links to `#` and
  still fires the `app_store_cta_clicked` analytics event, so the CTA wiring
  is provably correct ahead of having a real link. **Set this before running
  paid traffic.**
- **Support email**: `src/lib/config.ts` → `SUPPORT_EMAIL`, currently
  `support@nearr.app`. Two real addresses exist in the app repo and
  disagree — `support@nearr.app` (used throughout the drafted Privacy/Terms)
  vs. the founder's personal `andrew.mahran@icloud.com` (used in the app's
  `docs/legal/support.md` and as the EAS submit Apple ID). This site
  defaults to the branded address since a paid-campaign site is likely to
  draw scraper/spam traffic a personal inbox shouldn't have to absorb.
  **Confirm this is still the right inbox before launch.**
- **Site URL** (for metadata/canonical/sitemap): `src/lib/config.ts` →
  `siteConfig.url`, currently a placeholder `https://nearr.app` — update
  once the production domain is confirmed.

## Attribution contract

Creator/campaign links need to survive navigation across the site, not just
land on `/` and get dropped. The contract:

1. **Recognized query params**: `utm_source`, `utm_medium`, `utm_campaign`,
   `utm_content`, `utm_term`, `creator`, `video`, `ref` (see
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
`shazam_section_viewed`, `save_flow_section_viewed`, `map_section_viewed`,
`creator_landing_viewed`.

## Future-route readiness

- **Creator landing pages** (`nearr.app/c/<creator>`): implemented today at
  `src/app/c/[creator]/page.tsx`. Renders the same homepage story with a
  small "via @creator" banner and tags attribution automatically. Per-creator
  copy/imagery can be layered in later without changing the route contract.
- **Nearr place links** (`nearr.app/place/<id>`): implemented today at
  `src/app/place/[id]/page.tsx` as a fallback page (`noindex`) — Nearr
  doesn't yet support sharing a place link (only the original social video),
  so there's no backend to fetch place data from. The page attempts the
  `nearr://place/<id>` app deep link (confirmed URL scheme, from the app's
  `app.config.js`) on iOS and otherwise shows a generic, always-correct
  fallback with the App Store CTA. When a place-fetching API exists, this
  route is where it plugs in.

## Adding testimonials

`src/components/sections/Testimonials.tsx` renders nothing while its
`TESTIMONIALS` array is empty (Nearr is pre-launch — there's no real social
proof yet, and none was fabricated for this build). To add one, get
**explicit, in-writing approval** from the person quoted to use their words
in marketing, then add `{ quote, name, handle }` to the array.

## Product assets reused from the Nearr app repo

Copied in (not referenced by path — the app repo is untouched and this repo
has no dependency on it):

- `src/app/icon.png`, `src/app/apple-icon.png`, `public/brand/app-icon-*.png`
  — resized from the real Nearr app icon (`assets/icon.png` in the app repo).
- Brand colors in `src/app/globals.css` — the app's actively-shipping
  accent `#FF6A1A` and its (currently dormant, light-mode-only) cream
  palette `#FFF8F1` / `#1F1913` / `#6F6257` / `#E7D6C4`, from
  `constants/colors.ts` and `lib/theme.tsx` in the app repo. **Note**: the
  app itself currently ships dark-mode-by-default; the cream palette exists
  in code but the app's own `docs/UI_THEME_NOTES.md` flags it as possibly
  stale. This site uses cream/light per this project's brief — sanity-check
  that direction against current brand intent before a big campaign push.
- Copy on `/privacy` and `/terms` is adapted from `docs/legal/PRIVACY.md`
  and `docs/legal/TERMS.md` in the app repo, which are themselves explicitly
  marked "Draft for internal production readiness only. Lawyer review
  required before public launch." That caveat is carried forward as a
  visible banner on both pages here — don't remove it until real legal
  review has happened.
- Copy on `/support` is adapted from `docs/legal/support.md` in the app
  repo (email swapped per the note above).
- No real screenshots exist in the app repo (confirmed during the brand
  audit). All product UI shown on this site — the hero demo, the Shazam
  scenario demo, the map/place cards — is an original CSS/SVG mockup built
  for this site, not a captured screenshot.

## Deployment (not done as part of this build)

This site has not been deployed, and no domain/DNS/GitHub connection was
touched. To deploy to Vercel later:

1. `vercel link` (or import the repo in the Vercel dashboard) from this
   directory.
2. Set the production domain once confirmed, and update
   `siteConfig.url` in `src/lib/config.ts` to match.
3. Fill in `APP_STORE_URL` and re-check `SUPPORT_EMAIL` in
   `src/lib/config.ts` before sending paid traffic.
4. `vercel --prod` (or push to the connected Git branch, if using Git
   integration).

No environment variables are required for the current build.
