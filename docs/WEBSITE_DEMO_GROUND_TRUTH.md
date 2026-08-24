# Website demo ground truth

This document is internal provenance for the recognition examples shown on the
Nearr marketing site. It is not rendered by the website.

All five examples are public Instagram posts from Nearr's checked-in share gold
evaluation corpus. Each row is labeled `pass`, and the backend candidate matches
the expected venue and address. The source videos were downloaded with the
existing public-media acquisition tooling, inspected as contact sheets, and
reduced to one optimized WebP frame. No user identity or private database ID is
included.

## Mad Yolks

- Source URL: https://www.instagram.com/p/C-BEtdnyGdR/
- Source platform: Instagram
- Canonical source identity: `C-BEtdnyGdR` (public post by Mad Yolks)
- Exact place: Mad Yolks
- Confirmed address: 1411 Pacific Ave, Santa Cruz, CA 95060
- Ground truth evidence: expected and backend candidate names match; expected
  and backend addresses match; evaluation label is `pass`
- Recognition outcome: candidate confirmation
- Frame: `public/images/demos/mad-yolks.webp`
- Frame provenance: public source video at 00:06.0
- Ground truth confirmed: YES
- Used on site: YES (hero and Vayrin examples)

## Seabright Deli

- Source URL: https://www.instagram.com/p/DWUI9fvDCck/
- Source platform: Instagram
- Canonical source identity: `DWUI9fvDCck` (public post by Double Meat Please)
- Exact place: Seabright Deli
- Confirmed address: 415 Seabright Ave, Santa Cruz, CA 95062
- Ground truth evidence: expected and backend candidate names match; expected
  and backend addresses match; evaluation label is `pass`
- Recognition outcome: candidate confirmation
- Frame: `public/images/demos/seabright-deli.webp`
- Frame provenance: public source video at 00:09.0
- Ground truth confirmed: YES
- Used on site: YES

## Baqba Mexican Grill

- Source URL: https://www.instagram.com/p/DYlLg3coKFw/
- Source platform: Instagram
- Canonical source identity: `DYlLg3coKFw` (public post by OC Food / Christine)
- Exact place: Baqba Mexican Grill
- Confirmed address: 4288 Holt Blvd Unit J, Montclair, CA 91763
- Ground truth evidence: expected and backend candidate names match; expected
  and backend addresses match; evaluation label is `pass`
- Recognition outcome: candidate confirmation
- Frame: `public/images/demos/baqba-mexican-grill.webp`
- Frame provenance: public source video at 00:03.0
- Ground truth confirmed: YES
- Used on site: YES

## Famous Dave's Bar-B-Que

- Source URL: https://www.instagram.com/p/DYidHK4PuVf/
- Source platform: Instagram
- Canonical source identity: `DYidHK4PuVf` (public post by OC Food / Christine)
- Exact place: Famous Dave's Bar-B-Que
- Confirmed address: 300 S Pine Ave, Long Beach, CA 90802
- Ground truth evidence: expected and backend candidate names match; expected
  and backend addresses match; evaluation label is `pass`
- Recognition outcome: candidate confirmation
- Frame: `public/images/demos/famous-daves-long-beach.webp`
- Frame provenance: public source video at 00:04.5
- Ground truth confirmed: YES
- Used on site: YES

## Aptos St. BBQ

- Source URL: https://www.instagram.com/p/DWZNJZ-EthD/
- Source platform: Instagram
- Canonical source identity: `DWZNJZ-EthD` (public post by Fiona Beata)
- Exact place: Aptos St. BBQ
- Confirmed address: 8059 Aptos St, Aptos, CA 95003
- Ground truth evidence: expected and backend candidate names match; expected
  and backend addresses match; evaluation label is `pass`
- Recognition outcome: candidate confirmation
- Frame: `public/images/demos/aptos-st-bbq.webp`
- Frame provenance: public source video at 00:04.0
- Ground truth confirmed: YES
- Used on site: YES

## Evidence source

- Nearr repository artifact:
  `artifacts/share-gold-labeling-labeled.json`
- Nearr repository summary: `artifacts/share-gold-summary.md`
- Validation date for website use: 2026-08-24

The website intentionally says "Found from the video" rather than promising
that every video can always be resolved. All five examples required a quick
confirmation in the recorded evaluation, which matches the site's statement
that ambiguous results are confirmed before saving.
