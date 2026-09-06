import { cache } from "react";
import { PUBLIC_PLACE_API_URL } from "./config.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const REF_RE = /^r_[A-Za-z0-9_-]{20,64}$/;

export type PublicPlace = {
  requestedPublicId: string;
  publicId: string;
  redirected: boolean;
  name: string;
  category: string | null;
  placeType: string | null;
  locality: string | null;
  region: string | null;
  country: string | null;
  displayAddress: string | null;
  latitude: number;
  longitude: number;
  heroImage: string | null;
  originalVideoUrl: null;
  available: boolean;
};

export function isPublicPlaceId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

export function sanitizeReferralId(value: unknown): string | null {
  return typeof value === "string" && REF_RE.test(value) ? value : null;
}

export const getPublicPlace = cache(async (
  publicPlaceId: string,
  referralId: string | null,
): Promise<PublicPlace | null> => {
  if (!isPublicPlaceId(publicPlaceId)) return null;
  const url = new URL(`${PUBLIC_PLACE_API_URL.replace(/\/$/, "")}/${publicPlaceId.toLowerCase()}`);
  url.searchParams.set("channel", "web");
  if (referralId) url.searchParams.set("ref", referralId);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });
  if (response.status === 400 || response.status === 404) return null;
  if (!response.ok) throw new Error(`public_place_api_${response.status}`);
  const place = await response.json() as PublicPlace;
  if (!isPublicPlaceId(place.publicId) || typeof place.name !== "string") {
    throw new Error("invalid_public_place_response");
  }
  return place;
});

export function placeLocation(place: PublicPlace): string {
  return [place.locality, place.region, place.country].filter(Boolean).join(", ") ||
    place.displayAddress ||
    "Saved on Nearr";
}

export function publicPlaceEventUrl(publicPlaceId: string, referralId: string | null) {
  const url = new URL(`${PUBLIC_PLACE_API_URL.replace(/\/$/, "")}/${publicPlaceId}`);
  url.searchParams.set("channel", "web");
  if (referralId) url.searchParams.set("ref", referralId);
  return url.toString();
}
