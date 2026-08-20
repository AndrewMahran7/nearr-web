import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
  ATTRIBUTION_COOKIE_NAME,
  ATTRIBUTION_PARAM_KEYS,
  parseAttributionCookie,
  sanitizeAttributionValue,
  type AttributionData,
} from "@/lib/attribution";

/**
 * Captures creator/campaign attribution into a first-party cookie so it
 * survives navigation across the site (not just the landing page), without
 * requiring every internal link to carry query params forward. See
 * README.md → "Attribution contract".
 *
 * Runs on every request (Next.js 16 renamed Middleware to Proxy — same
 * mechanism, see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md).
 */
export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const incoming: AttributionData = {};
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = sanitizeAttributionValue(searchParams.get(key));
    if (value) incoming[key] = value;
  }

  // `/c/<creator>` is the creator-landing-page contract (see app/c/[creator]).
  // A bare visit to that path counts as creator attribution even without an
  // explicit `?creator=` query param, but an explicit query param wins.
  const creatorPathMatch = pathname.match(/^\/c\/([^/]+)/);
  if (creatorPathMatch && !incoming.creator) {
    let creatorSegment = creatorPathMatch[1];
    try {
      creatorSegment = decodeURIComponent(creatorSegment);
    } catch {
      // Keep the raw segment; the sanitizer still bounds and cleans it.
    }
    incoming.creator = sanitizeAttributionValue(creatorSegment);
  }

  if (Object.keys(incoming).length === 0) {
    return NextResponse.next();
  }

  const existing = parseAttributionCookie(
    request.cookies.get(ATTRIBUTION_COOKIE_NAME)?.value,
  );

  const merged: AttributionData = {
    ...existing,
    ...incoming,
    capturedAt: existing.capturedAt ?? new Date().toISOString(),
  };

  const response = NextResponse.next();
  response.cookies.set(ATTRIBUTION_COOKIE_NAME, JSON.stringify(merged), {
    maxAge: ATTRIBUTION_COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml|brand/).*)",
};
