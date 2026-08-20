import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import {
  absoluteUrl,
  APP_STORE_URL,
  INDEXABLE_ROUTES,
  siteConfig,
  SUPPORT_EMAIL,
} from "../src/lib/config.ts";

test("public launch configuration has safe defaults", () => {
  assert.match(siteConfig.url, /^https?:\/\/[^/]+$/);
  assert.equal(new URL(APP_STORE_URL).hostname, "apps.apple.com");
  assert.match(SUPPORT_EMAIL, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

test("canonical URL construction is stable and query-free", () => {
  assert.equal(absoluteUrl("/privacy"), `${siteConfig.url}/privacy`);
  assert.equal(absoluteUrl("/"), siteConfig.url);
  assert.deepEqual(INDEXABLE_ROUTES, ["/", "/privacy", "/terms", "/support"]);
});

test("invalid public URL overrides fail with a clear configuration error", () => {
  const configUrl = new URL("../src/lib/config.ts", import.meta.url).href;
  const loadConfig = `import(${JSON.stringify(configUrl)})`;
  const invalidStore = spawnSync(
    process.execPath,
    ["--input-type=module", "--eval", loadConfig],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        NEXT_PUBLIC_APP_STORE_URL: "https://example.com/not-nearr",
      },
    },
  );
  const invalidSite = spawnSync(
    process.execPath,
    ["--input-type=module", "--eval", loadConfig],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL: "https://example.com/marketing",
      },
    },
  );

  assert.notEqual(invalidStore.status, 0);
  assert.match(invalidStore.stderr, /must point to apps\.apple\.com/);
  assert.notEqual(invalidSite.status, 0);
  assert.match(invalidSite.stderr, /must be an origin without a path/);
});
