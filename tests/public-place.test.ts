import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  isPublicPlaceId,
  placeLocation,
  publicPlaceEventUrl,
  sanitizeReferralId,
  type PublicPlace,
} from "../src/lib/public-place.ts";

const publicId = "7b98ca4a-52be-4d48-9886-5d95e165b722";
const referralId = "r_AbCdEfGhIjKlMnOpQrStUvWx";

test("public identity and referral inputs fail closed", () => {
  assert.equal(isPublicPlaceId(publicId), true);
  assert.equal(isPublicPlaceId("saved-secret"), false);
  assert.equal(sanitizeReferralId(referralId), referralId);
  assert.equal(sanitizeReferralId("sender@example.com"), null);
  const event = new URL(publicPlaceEventUrl(publicId, referralId));
  assert.equal(event.pathname, `/functions/v1/public-place/${publicId}`);
  assert.equal(event.searchParams.get("ref"), referralId);
  assert.equal(event.searchParams.get("channel"), "web");
});

test("public place rendering uses bounded public location data", () => {
  const place: PublicPlace = {
    requestedPublicId: publicId,
    publicId,
    redirected: false,
    name: "Night + Market",
    category: "restaurant",
    placeType: "Thai restaurant",
    locality: "Los Angeles",
    region: "CA",
    country: "USA",
    displayAddress: "9043 Sunset Blvd, West Hollywood, CA",
    latitude: 34.09,
    longitude: -118.39,
    heroImage: null,
    originalVideoUrl: null,
    available: true,
  };
  assert.equal(placeLocation(place), "Los Angeles, CA, USA");
});

test("SSR route, metadata, app association, CTA, and privacy contracts", () => {
  const root = process.cwd();
  const page = readFileSync(join(root, "src/app/p/[publicPlaceId]/page.tsx"), "utf8");
  const actions = readFileSync(join(root, "src/app/p/[publicPlaceId]/PlaceActions.tsx"), "utf8");
  const aasa = JSON.parse(readFileSync(join(root, "public/.well-known/apple-app-site-association"), "utf8"));
  const assetlinks = JSON.parse(readFileSync(join(root, "public/.well-known/assetlinks.json"), "utf8"));

  assert.match(page, /generateMetadata/);
  assert.match(page, /\$\{place\.name\} on Nearr/);
  assert.match(page, /PlaceActions/);
  assert.match(page, /permanentRedirect/);
  assert.match(actions, /nearr:\/\/p\//);
  assert.match(actions, /Save to my map/);
  assert.match(actions, /APP_STORE_URL/);
  assert.deepEqual(aasa.applinks.details[0].appIDs, ["9S69NZQTUX.com.nearr.ios"]);
  assert.equal(aasa.applinks.details[0].components[0]["/"], "/p/*");
  assert.deepEqual(assetlinks, [], "Android remains fail-closed until a production signing fingerprint exists");

  for (const forbidden of ["user_id", "created_by", "notes", "ai_note", "saved_place_id", "source_url"]) {
    assert.ok(!page.includes(forbidden), `SSR page excludes ${forbidden}`);
  }
});
