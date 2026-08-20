import assert from "node:assert/strict";
import test from "node:test";
import {
  ATTRIBUTION_VALUE_MAX_LENGTH,
  CREATOR_HANDLE_MAX_LENGTH,
  normalizeCreatorHandle,
  parseAttributionCookie,
  sanitizeAttributionValue,
} from "../src/lib/attribution.ts";

test("parseAttributionCookie keeps only recognized, bounded values", () => {
  const result = parseAttributionCookie(
    JSON.stringify({
      creator: "  near-rider  ",
      campaign: "launch",
      source: "creator_link",
      ignored: "not part of the contract",
      video: 42,
      capturedAt: "2026-08-19T12:00:00.000Z",
    }),
  );

  assert.deepEqual(result, {
    creator: "near-rider",
    campaign: "launch",
    source: "creator_link",
    capturedAt: "2026-08-19T12:00:00.000Z",
  });
});

test("malformed attribution cookies fail closed", () => {
  assert.deepEqual(parseAttributionCookie("not-json"), {});
  assert.deepEqual(parseAttributionCookie("[]"), {});
  assert.deepEqual(parseAttributionCookie('{"__proto__":{"polluted":true}}'), {});
});

test("attribution and creator values are normalized safely", () => {
  assert.equal(sanitizeAttributionValue("  camp\u0000aign  "), "campaign");
  assert.equal(
    sanitizeAttributionValue("x".repeat(ATTRIBUTION_VALUE_MAX_LENGTH + 10))
      ?.length,
    ATTRIBUTION_VALUE_MAX_LENGTH,
  );
  assert.equal(normalizeCreatorHandle("@@trail-guide"), "trail-guide");
  assert.equal(normalizeCreatorHandle("\u0000"), "creator");
  assert.equal(
    normalizeCreatorHandle("x".repeat(CREATOR_HANDLE_MAX_LENGTH + 10)).length,
    CREATOR_HANDLE_MAX_LENGTH,
  );
});
