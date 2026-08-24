# Vayrin website asset status

The canonical identity lives in `C:\Users\andre\Desktop\Vayrin-Brand`.
That repository currently contains the approved Orange Core direction,
behavior, copy, and asset specification, but no production-ready transparent
character exports.

## What the site uses now

- `src/components/ui/VayrinAvatar.tsx`: a code-native bust treatment for
  neutral, looking, and found states. It uses the canonical cream `#F4F2EF`,
  charcoal `#0F1014`, and orange `#FF6A1A` palette, two capsule eyes, no mouth,
  no props, and no purple.
- The avatar appears only while Vayrin is finding or presenting a place. It
  does not appear on the map, saved-place, or nearby-reminder surfaces.
- Motion is limited to a status pulse, respects reduced motion, and is always
  paired with text.

## Shared render policy

Do not generate a separate website-only full-body Vayrin. When the brand
repository gains approved production exports, consume the shared files using
the canonical names in `VAYRIN_ASSET_SPEC.md`:

- `vayrin-full-welcome-light@2x.png` for a future hero treatment
- `vayrin-full-searching-dark@2x.png` for the recognition section
- bust neutral/searching/happy exports for small state surfaces

Any future swap must preserve one Vayrin per recognition surface and keep him
absent after the place is saved.

## Real website media

The five recognition frames now used by the hero and example gallery are
documented in `docs/WEBSITE_DEMO_GROUND_TRUTH.md`. They replace the previous
generic scenario imagery and are not Vayrin character assets.
