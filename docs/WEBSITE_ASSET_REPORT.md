# Website asset and sourcing report

Generated 2026-08-24 from the production source tree after the final image
pass.

## Production image weight

- Served image files: 17
- Total checked-in production image bytes: 808,633 bytes (0.771 MiB)
- Largest served image: `public/brand/app-icon-512.png`, 232,849 bytes
- Large source originals served from `public/`: NO
- Source originals retained outside `public/`: 10 PNGs, 19,155,262 bytes
  (18.268 MiB)
- Unused generic Vayrin gallery WebPs removed from `public/`: 6

Next Image supplies responsive variants at request time. Every below-fold
marketing image is lazy-loaded; the hero's real source frame and app icon are
the only prioritized images.

## Major asset provenance

| Asset | Website use | Source | Processing |
|---|---|---|---|
| `mad-yolks.webp` | Hero phone and recognition gallery | Public Instagram post `C-BEtdnyGdR` in Nearr's labeled evaluation corpus | Frame at 00:06.0, center crop, 540×720 WebP |
| `seabright-deli.webp` | Recognition gallery | Public Instagram post `DWUI9fvDCck` in Nearr's labeled evaluation corpus | Frame at 00:09.0, center crop, 540×720 WebP |
| `baqba-mexican-grill.webp` | Recognition gallery | Public Instagram post `DYlLg3coKFw` in Nearr's labeled evaluation corpus | Frame at 00:03.0, center crop, 540×720 WebP |
| `famous-daves-long-beach.webp` | Recognition gallery | Public Instagram post `DYidHK4PuVf` in Nearr's labeled evaluation corpus | Frame at 00:04.5, center crop, 540×720 WebP |
| `aptos-st-bbq.webp` | Recognition gallery | Public Instagram post `DWZNJZ-EthD` in Nearr's labeled evaluation corpus | Frame at 00:04.0, center crop, 540×720 WebP |
| `how-it-works-share-to-nearr.webp` | Share step | Existing Nearr-Web source asset `assets/originals/how-it-works-share-to-nearr-source.png` | Prior optimized 720px WebP |
| `how-it-works-quick-check.webp` | Confirmation step | Existing Nearr-Web source asset `assets/originals/how-it-works-quick-check-source.png` | Prior optimized 720px WebP |
| `map-of-places-hero.webp` | Saved-map experience | Existing Nearr-Web source asset `assets/originals/map-of-places-hero-source.png` | Prior optimized 1600×900 WebP |
| Category card WebPs | Saved-map categories | Existing Nearr-Web source strip `assets/originals/category-cards-strip-source.png` | Prior cropped and optimized WebPs |
| App icon PNGs | Header, CTAs, notification, metadata | Nearr app repo `assets/icon.png` | Existing resized PNG exports |
| `VayrinAvatar.tsx` | Looking and found states | Canonical Orange Core direction in `Vayrin-Brand` | Code-native SVG bust; no separate character bitmap |

Exact public-post provenance and ground-truth evidence are in
`docs/WEBSITE_DEMO_GROUND_TRUTH.md`.
