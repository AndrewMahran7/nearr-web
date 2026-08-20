# Vayrin / launch-media asset manifest

Exact production assets needed to take the website from placeholder mockups
to real media. Nothing here was added to the repo yet — `VayrinAvatar.tsx`
(a small SVG stand-in) and CSS/SVG mockups are what's live today. Place
finished files under `public/assets/` using the **exact filenames** below —
components already reference these paths conceptually; wiring a real file
in is a one-line swap per component (noted under each asset).

Kept deliberately small: 4 Vayrin images, 3 real screenshots (1 required,
2 lower-priority), 1 real video. Reuse these across every section that
needs them rather than requesting new crops per section.

## Manifest table

| Priority | Filename | Category | Website location | Exact content | Aspect ratio | Resolution | Background | Text treatment | Owner |
|---|---|---|---|---|---|---|---|---|---|
| REQUIRED | `vayrin-hero.webp` | GENERATED VAYRIN ARTWORK | Vayrin section — large intro visual next to/above the "Meet Vayrin" heading | Full standing pose, confident and welcoming | 4:5 | 960×1200 | transparent | NO baked-in text | CHATGPT/IMAGE GENERATION |
| REQUIRED | `vayrin-neutral.webp` | GENERATED VAYRIN ARTWORK | Vayrin section — "Just ask Vayrin" chat-bubble avatar; default-state avatar anywhere else needed | Close bust/headshot, calm neutral expression | 1:1 | 512×512 | transparent | NO baked-in text | CHATGPT/IMAGE GENERATION |
| REQUIRED | `vayrin-searching.webp` | GENERATED VAYRIN ARTWORK | Hero demo — "Vayrin is looking…" state; Vayrin demo — analyzing badge | Close bust, focused/searching expression | 1:1 | 512×512 | transparent | NO baked-in text | CHATGPT/IMAGE GENERATION |
| REQUIRED | `vayrin-found.webp` | GENERATED VAYRIN ARTWORK | Hero demo — result-found state; Vayrin demo — result badge | Close bust, pleased/confident expression | 1:1 | 512×512 | transparent | NO baked-in text | CHATGPT/IMAGE GENERATION |
| REQUIRED | `map-home.webp` | REAL NEARR SCREENSHOT | Map section — primary visual (framed device card) | Real map tab, 8+ saved pins across 3+ categories | 9:19.5 | native capture | real app UI | none added | USER MUST CAPTURE FROM REAL APP |
| REQUIRED | `share-to-vayrin.mp4` | REAL NEARR SCREEN RECORDING | Hero — right-side product demo, replacing the mocked panel sequence | Full share → Vayrin → result → map flow | 9:16 | 1080×1920 or native | real app UI | none overlaid | USER MUST CAPTURE FROM REAL APP |
| RECOMMENDED | `place-result.webp` | REAL NEARR SCREENSHOT | Future upgrade: Hero/Vayrin demo result state, replacing the CSS card | Real "place identified" result screen | 9:19.5 | native capture | real app UI | none added | USER MUST CAPTURE FROM REAL APP |
| OPTIONAL | `place-detail.webp` | REAL NEARR SCREENSHOT | Future upgrade: one real saved-place card | Real saved-place detail view | 9:19.5 or 4:5 crop | native capture | real app UI | none added | USER MUST CAPTURE FROM REAL APP |

**Category card thumbnails** (Map section's 4 small cards, ProblemSection's
scatter cards, and every scenario thumbnail in the Vayrin demo) are
intentionally left as abstract gradients, not requested here. They stand in
for *someone else's* social video content, which Nearr doesn't own — using
real or generated Instagram/TikTok/Facebook-style imagery there would be
either a fabrication risk or a trademark-confusion risk. Leave them
abstract.

## Video storyboard

### `share-to-vayrin.mp4`

- **Duration**: 8–10s · **Orientation**: vertical, 9:16 · **Audio**: not
  required (site will likely autoplay muted); include only if the real
  device audio is clean — otherwise silent is fine
- **Cursor/taps**: real finger taps are fine and expected; no artificial
  cursor overlay
- **Captions**: none overlaid by the video itself — any on-screen text
  should be genuine app/OS UI, not added marketing copy (the site renders
  its own copy around the video)
- **Capture device**: a real iPhone screen recording (not a simulator, if
  avoidable) for authentic touch feedback

| Time | Beat |
|---|---|
| 0.0–2.0s | A real Instagram, TikTok, or Facebook post/video is open on screen, showing a place that isn't named in the caption |
| 2.0–3.0s | Tap the native Share button → iOS share sheet appears → tap Nearr |
| 3.0–3.5s | Brief handoff into Nearr's share-processing screen |
| 3.5–6.5s | Vayrin's real searching/processing UI plays out on screen |
| 6.5–8.5s | The identified place result appears (name, category, confirm/save) |
| 8.5–10.0s | Cut to the Nearr map with the new pin visible |

Swap-in point: `src/components/sections/HeroDemo.tsx` — replace the
`VideoPanel` / `SharePanel` / `AnalyzingPanel` / `ResultPanel` sequence
with this video (a single `<video>` covering the device stage), or keep
the mocked panels and treat this as a separate future hero variant.

## Vayrin artwork specifications

All four share one character: soft off-white rounded shell, dark
near-black oval face, simple white eyes (expressive through shape, not a
detailed human face), small Nearr-orange 4-point discovery-star mark. This
is the reference boards' "Orange Core" colorway — chosen over the
alternate purple exploration because it's already Nearr's shipping accent
color (`#FF6A1A`), reads clearly on both the site's cream and near-black
sections, and avoids introducing a second, competing brand hue.

### `vayrin-hero.webp` — full standing pose

- **Pose**: standing, facing slightly toward the viewer (not perfectly
  frontal — implies approachability, not a mugshot)
- **Expression/eyes**: neutral-to-helpful — two even, vertical white pill
  eyes, calm
- **Hand position**: one hand relaxed at the side, the other raised in a
  small, low-key wave or open "ready to help" gesture — not a big cartoon
  wave
- **Body orientation**: standing upright, weight relaxed
- **Discovery star**: visible on the chest, steady (not animated/glowing
  in the still image)
- **Backpack**: optional — include a small orange backpack if it doesn't
  crowd the silhouette; omit if a cleaner shape reads better at small
  display sizes. Owner's call.
- **Crop**: head to just below the knee or full figure with headroom above
  and a small margin below — leave room for the site to crop further if
  needed
- **Lighting**: soft, even, studio-style — no dramatic directional shadow
  that would look odd once composited into a flat web section
- **Colorway**: Orange Core (off-white shell / near-black face / Nearr
  orange accent) — not the dark-shell or purple variants

### `vayrin-neutral.webp`, `vayrin-searching.webp`, `vayrin-found.webp` — bust crops

Same character, cropped tighter (top of head to roughly mid-chest), facing
forward. These render at small display sizes (as small as ~40px on
screen), so keep the eye shapes bold and simple rather than intricate.

- **`vayrin-neutral`**: calm, even eyes (two vertical pills), relaxed —
  the "ready and listening" state
- **`vayrin-searching`**: eyes narrowed into a focused, scanning
  expression (thin horizontal pills or a slight squint) — reads as
  actively investigating, not worried or straining
- **`vayrin-found`**: eyes as upward, pleased curves (closed-eye smile
  shape) with a slight confident chin lift — satisfied, not exaggerated
  or silly

All three: transparent background, no baked-in text, no visible discovery
star required at this crop (optional if it fits naturally near the
shoulder).

## Real Nearr capture instructions

### `map-home.webp`

- **Screen**: the Map tab, primary/default view
- **State/data**: at least 8 saved places, spread across at least 3
  categories (e.g. food & drink, outdoors, stays) — avoid a cluster that
  reads as only one neighborhood or only one category
- **Status bar**: fine either way; just make sure no notification content
  or personal identifiers are visible in it
- **Dark/light mode**: dark is fine — it's the app's current default. Only
  use light mode if that's what's actually live at capture time.
- **Private data**: no real account email, phone number, or other
  personal identifiers visible anywhere on screen

### `place-result.webp` (recommended)

- **Screen**: the result/confirmation screen shown right after Vayrin
  identifies a place from a shared video
- **State/data**: a real identified place — name, category, and a
  save/confirm affordance visible
- **Status bar / mode**: same guidance as `map-home.webp`
- **Private data**: none visible

### `place-detail.webp` (optional)

- **Screen**: a single saved place's detail view
- **State/data**: any one real saved place, any category, with its photo
  if the app shows one
- **Status bar / mode**: same guidance as `map-home.webp`
- **Private data**: no personal notes containing private information

## Folder tree

```
public/assets/
├── vayrin/
│   ├── vayrin-hero.webp
│   ├── vayrin-neutral.webp
│   ├── vayrin-searching.webp
│   └── vayrin-found.webp
├── product/
│   ├── map-home.webp
│   ├── place-result.webp
│   └── place-detail.webp
└── videos/
    └── share-to-vayrin.mp4
```
