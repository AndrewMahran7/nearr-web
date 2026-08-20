const DEFAULT_SITE_URL = "https://nearr.app";
const DEFAULT_APP_STORE_URL =
  "https://apps.apple.com/us/app/nearr/id6764170112";
const DEFAULT_SUPPORT_EMAIL = "andrew.mahran@icloud.com";

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
const configuredSiteUrl = readUrl(
  "NEXT_PUBLIC_SITE_URL",
  process.env.NEXT_PUBLIC_SITE_URL,
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
    "Share a social video with Nearr. Vayrin looks for the place, and Nearr saves the result to your map so you can find it later.",
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
