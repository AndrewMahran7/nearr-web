/**
 * Creator / campaign attribution — shared data contract.
 *
 * Query parameters listed here are captured by `src/proxy.ts` on first
 * touch (and merged on any later touch) into a first-party cookie so they
 * survive navigation across the site, not just the landing page. See
 * README.md → "Attribution contract" for the full write-up.
 */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "creator",
  "video",
  "ref",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];

export type AttributionData = Partial<Record<AttributionKey, string>> & {
  /** ISO timestamp of the first time attribution was captured for this visitor. */
  capturedAt?: string;
};

export const ATTRIBUTION_COOKIE_NAME = "nearr_attribution";
export const ATTRIBUTION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days

export function parseAttributionCookie(
  raw: string | undefined | null,
): AttributionData {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as AttributionData;
    return {};
  } catch {
    return {};
  }
}

/**
 * Client-only: read the attribution cookie set by `proxy.ts`. Safe to call
 * during render in a Client Component — returns `{}` on the server pass.
 */
export function getClientAttribution(): AttributionData {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ATTRIBUTION_COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return {};
  return parseAttributionCookie(decodeURIComponent(match[1]));
}
