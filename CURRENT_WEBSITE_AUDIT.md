# Current website audit

Baseline: `origin/main` at `175309652fbaea6eb4107ce89f34f7d3170cd8e8` and the live Vercel Production deployment `dpl_8wEtxQNWfZS8Na7ZKu5v2xRMgh2V`.

## Homepage and product story

- **KEEP:** Outcome-led headline, working App Store CTA, real share-sheet screenshot, saved-map concept, nearby reminder, and a short final CTA.
- **IMPROVE:** Put the exact-place reveal in the first viewport, broaden examples beyond food, make the map and product UI feel like the product rather than illustrations, and add the nearby-discovery and place-sharing stories.
- **REPLACE:** The four-step animated hero, generic screenshot/notes problem collage, character-led recognition section, testimonial cards, and the confirmation/manual-check framing.
- **REMOVE:** All user-facing Vayrin language and visuals, food-first examples, “quick check”/manual-first terminology, and the current Quick Check screenshot containing Vayrin copy.

## Navigation, CTA, and footer

- **KEEP:** Sticky navigation, App Store destination, support/privacy/terms links, platform trademark disclaimer, and accessible skip link.
- **IMPROVE:** Reduce navigation to “How it works”, “Features”, and “Get Nearr”; make the mobile menu’s open/close behavior and focus treatment explicit; keep CTA frequency deliberate.
- **REPLACE:** “Vayrin” and “Your map” navigation labels with current product-language anchors.
- **REMOVE:** No legal or support destination should be removed.

## Product visuals and motion

- **KEEP:** App icon, orange/charcoal/cream identity, real social-share UI, current app-map screenshots where accurate, subtle reveal utilities, and reduced-motion media handling.
- **IMPROVE:** Use the current App Store preview set as the primary visual source; crop and frame real Nearr UI so it remains legible at mobile widths; constrain animation to reveal, pin, and notification moments.
- **REPLACE:** Generic illustrated map, food demo carousel, and code-drawn character avatar with current dark Nearr product imagery.
- **REMOVE:** Constant hero autoplay and decorative motion that does not explain the product.

## Routes and sharing

- **KEEP:** `/`, `/privacy`, `/terms`, `/support`, `/p/[publicPlaceId]`, `/c/[creator]`, legacy `/place/[id]`, AASA, assetlinks, robots, sitemap, referral capture, alias redirect, and dynamic public-place metadata.
- **IMPROVE:** Make creator landings reuse the revised homepage story and add a marketing section explaining public Nearr place links.
- **REPLACE:** Creator-page imports of the old recognition section.
- **REMOVE:** Nothing from the public-place API, referral, deep-link, or association contracts.

## SEO, analytics, performance, and accessibility

- **KEEP:** Next.js App Router metadata helpers, canonical URL support, dynamic `/p/` Open Graph metadata, JSON-LD, sitemap/robots routes, `next/image`, local optimized assets, semantic headings, keyboard-sized controls, and the reduced-motion CSS contract.
- **IMPROVE:** Use current product description everywhere, ship a stronger homepage social card, add deterministic homepage/metadata/link/responsive contracts, and verify the built output contains no user-facing legacy brand copy.
- **REPLACE:** Legacy description and legacy-named user-facing analytics constants with product-language equivalents while retaining historical identifiers only where changing them would risk attribution history.
- **REMOVE:** User-facing legacy copy in metadata, structured output, accessibility labels, and rendered HTML.

## Baseline findings

- Framework: Next.js `16.3.1`, React `19.2.8`, Tailwind CSS `4`, TypeScript.
- Analytics: local typed event interface only; no analytics vendor is wired up.
- Responsive behavior: mobile menu and responsive grids exist, but the current hero/product demo becomes visually small and the story is split across too many lightweight cards.
- Legacy-brand baseline: 41 case-insensitive source occurrences under `src/`; the live homepage HTML contains 21 rendered occurrences because App Router payloads repeat strings.
- Production status: `https://nearrapp.com` returns `200` from Vercel; privacy, AASA, assetlinks, robots, and sitemap also respond successfully.
