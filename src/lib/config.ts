const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_APP_STORE_URL =
  "https://apps.apple.com/us/app/nearr/id6764170112";
const DEFAULT_SUPPORT_EMAIL = "andrew.mahran@icloud.com";
const DEFAULT_PUBLIC_PLACE_API_URL =
  "https://rlqvxdwtetxsqxhqztkw.supabase.co/functions/v1/public-place";

function readUrl(
  name: string,
  value: string | undefined,
  fallback: string,
  allowedHosts?: ReadonlySet<string>,
) {
  const raw = value?.trim() || fallback;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`${name} must be an absolute http(s) URL.`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`${name} must use http or https.`);
  }
  if (parsed.username || parsed.password) {
    throw new Error(`${name} must not contain credentials.`);
  }
  if (allowedHosts && !allowedHosts.has(parsed.hostname)) {
    throw new Error(`${name} must point to ${[...allowedHosts].join(" or ")}.`);
  }
  if (allowedHosts && parsed.protocol !== "https:") {
    throw new Error(`${name} must use https.`);
  }

  return parsed.toString().replace(/\/$/, "");
}

function readEmail(name: string, value: string | undefined, fallback: string) {
  const email = value?.trim() || fallback;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${name} must be a valid email address.`);
  }
  return email;
}

/**
 * Central public configuration. Defaults keep local builds usable; deployment
 * can override them without spreading launch values across components.
 */
const siteUrlOverride = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const HAS_CONFIGURED_SITE_URL = Boolean(siteUrlOverride);

const configuredSiteUrl = readUrl(
  "NEXT_PUBLIC_SITE_URL",
  siteUrlOverride,
  DEFAULT_SITE_URL,
);
const siteUrl = new URL(configuredSiteUrl);
if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an origin without a path, query, or hash.",
  );
}

export const siteConfig = {
  name: "Nearr",
  url: siteUrl.origin,
  description:
    "Share a social video with Nearr. Vayrin finds the place, then Nearr saves it to your map and can remind you when you're nearby.",
};

/** The verified live Nearr App Store listing. */
export const APP_STORE_URL = readUrl(
  "NEXT_PUBLIC_APP_STORE_URL",
  process.env.NEXT_PUBLIC_APP_STORE_URL,
  DEFAULT_APP_STORE_URL,
  new Set(["apps.apple.com"]),
);

/**
 * Temporary public support contact, matching the canonical legal repository.
 * Keep this value until the branded support inbox is ready.
 */
export const SUPPORT_EMAIL = readEmail(
  "NEXT_PUBLIC_SUPPORT_EMAIL",
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  DEFAULT_SUPPORT_EMAIL,
);

/** Public, field-bounded Supabase Edge endpoint; no secret is embedded. */
export const PUBLIC_PLACE_API_URL = readUrl(
  "NEXT_PUBLIC_PUBLIC_PLACE_API_URL",
  process.env.NEXT_PUBLIC_PUBLIC_PLACE_API_URL,
  DEFAULT_PUBLIC_PLACE_API_URL,
);

export const INDEXABLE_ROUTES = [
  "/",
  "/privacy",
  "/terms",
  "/support",
] as const;

export function absoluteUrl(path = "/") {
  if (path === "/") return siteConfig.url;
  return new URL(path, `${siteConfig.url}/`).toString();
}
