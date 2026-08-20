/**
 * Creator/campaign attribution shared by the request proxy and analytics
 * interface. Values are deliberately bounded so a marketing URL cannot create
 * an oversized cookie or pass arbitrary objects into future analytics code.
 */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "creator",
  "video",
  "campaign",
  "source",
  "ref",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];

export type AttributionData = Partial<Record<AttributionKey, string>> & {
  /** ISO timestamp of the first time attribution was captured for this visitor. */
  capturedAt?: string;
};

export const ATTRIBUTION_COOKIE_NAME = "nearr_attribution";
export const ATTRIBUTION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
export const ATTRIBUTION_VALUE_MAX_LENGTH = 256;
export const CREATOR_HANDLE_MAX_LENGTH = 64;

export function sanitizeAttributionValue(value: unknown) {
  if (typeof value !== "string") return undefined;

  const sanitized = value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, ATTRIBUTION_VALUE_MAX_LENGTH);

  return sanitized || undefined;
}

export function normalizeCreatorHandle(value: unknown) {
  const sanitized = sanitizeAttributionValue(value)
    ?.replace(/^@+/, "")
    .slice(0, CREATOR_HANDLE_MAX_LENGTH);
  return sanitized || "creator";
}

export function parseAttributionCookie(
  raw: string | undefined | null,
): AttributionData {
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const record = parsed as Record<string, unknown>;
    const attribution: AttributionData = {};
    for (const key of ATTRIBUTION_PARAM_KEYS) {
      const value = sanitizeAttributionValue(record[key]);
      if (value) attribution[key] = value;
    }

    if (
      typeof record.capturedAt === "string" &&
      record.capturedAt.length <= 40 &&
      !Number.isNaN(Date.parse(record.capturedAt))
    ) {
      attribution.capturedAt = record.capturedAt;
    }

    return attribution;
  } catch {
    return {};
  }
}

/** Client-only read of the first-party attribution cookie. */
export function getClientAttribution(): AttributionData {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ATTRIBUTION_COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return {};
  return parseAttributionCookie(decodeURIComponent(match[1]));
}
