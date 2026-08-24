# Website QA report

Run date: 2026-08-24

## Automated and static checks

- Production build: PASS
- TypeScript: PASS
- ESLint: PASS
- Node tests: PASS (6/6)
- `git diff --check`: PASS
- Homepage and all public routes: PASS (HTTP 200)
- Referenced local links, images, and Next assets: PASS (HTTP 200)
- Forbidden invented demo copy scan: PASS
- Heading structure: PASS (one homepage `h1`, section `h2`s, demo result `h3`)
- Keyboard targets and visible focus styles: PASS by code inspection
- Reduced motion: PASS by code inspection
- Color contrast: PASS for all primary text pairs (minimum measured pair 4.99:1)
- Large originals served: NO

## Responsive visual matrix

The required browser surface was unavailable in this session. Per the browser
testing rules, no unrelated automation surface was substituted and no visual
PASS was claimed.

| Width | Hero | Vayrin | Examples | How it works | Notifications | CTA | Footer | No horizontal overflow |
|---:|---|---|---|---|---|---|---|---|
| 375 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |
| 390 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |
| 430 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |
| 768 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |
| 1024 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |
| 1440 | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN |

Static responsive review found no absolute side elements remaining, no card
wider than the 335px content width at 375px, wrapping controls for all five
example buttons, and breakpoint layouts at `sm`, `md`, and `lg`. Those checks
reduce risk but do not replace the missing visual inspection.

## Performance

- Production JavaScript: 654,626 raw bytes / 201,097 gzip bytes across all
  static chunks (shared and route-specific)
- Production CSS: 43,909 raw bytes / 8,216 gzip bytes
- Production image source tree: 808,633 bytes (0.771 MiB)
- LCP: NOT MEASURED (browser unavailable)
- CLS: NOT MEASURED (browser unavailable)
- Layout stability controls: intrinsic image dimensions or fixed aspect-ratio
  containers are present for every image
