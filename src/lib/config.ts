/**
 * Central site configuration.
 *
 * Values marked TODO must be filled in with real production values before
 * this site is used for paid campaign traffic. Nothing here was invented —
 * see the comments for what's confirmed vs. placeholder.
 */

export const siteConfig = {
  name: "Nearr",
  url: "https://nearr.app", // TODO: confirm production domain before deploy
  description:
    "Nearr turns the places you see in Instagram and TikTok videos into a real map you can visit. Share a video, Nearr finds the place, and reminds you when you're nearby.",
};

/**
 * App Store CTA target.
 *
 * No production App Store Connect URL, app ID, or bundle identifier was
 * found anywhere in the Nearr app repo during the brand audit for this
 * project (app.json / app.config.js / eas.json / docs) — the app does not
 * appear to be live on the App Store yet. Rather than invent a URL, the CTA
 * is centralized here so it can be dropped in later without touching
 * component code. Until set, the App Store button still renders normally
 * but links to "#" (see components/ui/AppStoreButton.tsx).
 */
export const APP_STORE_URL: string | null = null; // TODO: set real App Store URL, e.g. "https://apps.apple.com/app/id0000000000"

/**
 * Support contact.
 *
 * Two real addresses exist in the Nearr repo and disagree: `support@nearr.app`
 * (used throughout docs/legal/PRIVACY.md and TERMS.md) vs. the founder's
 * personal `andrew.mahran@icloud.com` (used in docs/legal/support.md and as
 * the EAS submit Apple ID). This site uses the former — the branded,
 * domain-backed address — since a paid-campaign marketing site is likely to
 * get scraped/spammed traffic a personal inbox shouldn't absorb. Confirm
 * this is still the right inbox before launch.
 */
export const SUPPORT_EMAIL = "support@nearr.app";
