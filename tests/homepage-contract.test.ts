import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import test from "node:test";

const root = process.cwd();
const src = (...parts: string[]) => readFileSync(join(root, ...parts), "utf8");

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const renderedSurface = [
  ...walk(join(root, "src/app")).filter((file) => [".tsx", ".ts"].includes(extname(file))),
  ...walk(join(root, "src/components")).filter((file) => extname(file) === ".tsx"),
  join(root, "src/lib/config.ts"),
  join(root, "src/lib/metadata.ts"),
];

test("homepage renders the complete current product story", () => {
  const page = src("src", "app", "page.tsx");
  for (const component of [
    "Hero",
    "GatekeepingSection",
    "SaveFlowSection",
    "ExactPlaceSection",
    "MapMemorySection",
    "BeyondSaveSection",
    "SharingSection",
    "FinalCta",
  ]) {
    assert.match(page, new RegExp(`<${component} \\/>`), `${component} is rendered`);
  }
});

test("user-facing website source contains zero legacy character references", () => {
  const offenders = renderedSurface.filter((file) => /vayrin/i.test(readFileSync(file, "utf8")));
  assert.deepEqual(
    offenders.map((file) => relative(root, file)),
    [],
  );
});

test("hero leads with the outcome and links to the real App Store", () => {
  const hero = src("src", "components", "sections", "Hero.tsx");
  const button = src("src", "components", "ui", "AppStoreButton.tsx");
  const config = src("src", "lib", "config.ts");
  assert.match(hero, /Find the place behind the video\./);
  assert.match(hero, /Send a Reel or TikTok to Nearr/);
  assert.match(hero, /See how it works/);
  assert.match(button, /APP_STORE_URL/);
  assert.match(config, /apps\.apple\.com\/us\/app\/nearr\/id6764170112/);
});

test("gatekeeping and exact-place sections describe the hard problem without accuracy hype", () => {
  const gatekeeping = src("src", "components", "sections", "GatekeepingSection.tsx");
  const exact = src("src", "components", "sections", "ExactPlaceSection.tsx");
  assert.match(gatekeeping, /Stop digging through the comments\./);
  assert.match(gatekeeping, /where is this\?/);
  assert.match(gatekeeping, /gatekeeping as usual/);
  assert.match(exact, /Nearr finds the exact place\./);
  assert.match(exact, /Even when the video doesn&apos;t tell you where it is\./);
  assert.match(exact, /likely\s+real-world destination/);
  assert.doesNotMatch(`${gatekeeping}\n${exact}`, /100%|always correct|find any place/i);
});

test("save, map, reminder, discovery, and sharing sections use current vocabulary", () => {
  const save = src("src", "components", "sections", "SaveFlowSection.tsx");
  const map = src("src", "components", "sections", "MapMemorySection.tsx");
  const beyond = src("src", "components", "sections", "BeyondSaveSection.tsx");
  const sharing = src("src", "components", "sections", "SharingSection.tsx");
  assert.match(save, /See it\. Send it\. Saved\./);
  assert.match(map, /Every place you save, on one map\./);
  assert.match(beyond, /Remember it when you&apos;re actually nearby\./);
  assert.match(beyond, /One place can lead to another\./);
  assert.match(beyond, /Explore nearby/);
  assert.match(sharing, /Share the place, not just the post\./);
  assert.match(sharing, /Save to my map/);
});

test("mobile navigation exposes only the minimal product links and CTA", () => {
  const header = src("src", "components", "layout", "Header.tsx");
  assert.match(header, /How it works/);
  assert.match(header, /Features/);
  assert.match(header, /aria-controls="mobile-nav"/);
  assert.match(header, /aria-expanded=\{menuOpen\}/);
  assert.match(header, /header_mobile/);
  assert.doesNotMatch(header, />Company<|>Solutions<|>Enterprise<|>Developers</);
});

test("homepage metadata and structured data match current positioning", () => {
  const metadata = src("src", "lib", "metadata.ts");
  const page = src("src", "app", "page.tsx");
  const layout = src("src", "app", "layout.tsx");
  const config = src("src", "lib", "config.ts");
  const expected = "Find places from TikTok and Instagram, save them to your map, get reminded when you're nearby, and share places with friends.";
  assert.match(metadata, /HOME_TITLE = "Find the place behind the video"/);
  assert.ok(page.includes(expected));
  assert.ok(config.includes(expected));
  assert.match(metadata, /summary_large_image/);
  assert.match(metadata, /SOCIAL_IMAGE_PATH = "\/og\.png"/);
  assert.ok(existsSync(join(root, "public", "og.png")));
  assert.match(layout, /SoftwareApplication/);
  assert.match(layout, /application\/ld\+json/);
});

test("product imagery is real, responsive, lazy below the fold, and bounded", () => {
  const imageNames = [
    "hero-map-ui.png",
    "exact-place-ui.png",
    "map-ui.png",
    "nearby-ui.png",
    "discover-ui.png",
  ];
  for (const name of imageNames) {
    const path = join(root, "public", "images", "product", name);
    assert.ok(existsSync(path), `${name} exists`);
    assert.ok(statSync(path).size < 2_000_000, `${name} stays below 2 MB`);
  }
  const components = renderedSurface.map((file) => readFileSync(file, "utf8")).join("\n");
  assert.match(components, /sizes="\(max-width: 1023px\)/);
  assert.match(components, /loading="lazy"/);
  assert.match(src("src", "components", "sections", "Hero.tsx"), /priority/);
});

test("reduced-motion and responsive overflow contracts are explicit", () => {
  const css = src("src", "app", "globals.css");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation-duration: 0\.001ms !important/);
  assert.match(css, /overflow-x: clip/);
  for (const file of ["Hero.tsx", "GatekeepingSection.tsx", "SaveFlowSection.tsx", "ExactPlaceSection.tsx", "MapMemorySection.tsx", "BeyondSaveSection.tsx", "SharingSection.tsx"]) {
    assert.match(src("src", "components", "sections", file), /(sm:|lg:)/, `${file} has responsive behavior`);
  }
});

test("public place, referral, and well-known contracts remain wired", () => {
  const page = src("src", "app", "p", "[publicPlaceId]", "page.tsx");
  const actions = src("src", "app", "p", "[publicPlaceId]", "PlaceActions.tsx");
  const proxy = src("src", "proxy.ts");
  const aasa = JSON.parse(src("public", ".well-known", "apple-app-site-association"));
  const assetlinks = JSON.parse(src("public", ".well-known", "assetlinks.json"));
  assert.match(page, /generateMetadata/);
  assert.match(page, /permanentRedirect/);
  assert.match(actions, /nearr:\/\/p\//);
  assert.match(actions, /Save to my map/);
  assert.match(proxy, /ATTRIBUTION_COOKIE_NAME/);
  assert.equal(aasa.applinks.details[0].components[0]["/"], "/p/*");
  assert.deepEqual(assetlinks, []);
});

test("marketing surface has no embedded private data", () => {
  const text = renderedSurface.map((file) => readFileSync(file, "utf8")).join("\n");
  for (const forbidden of [
    /service_role/i,
    /SUPABASE_SERVICE_ROLE_KEY/,
    /OPENAI_API_KEY/,
    /private[_-]?key/i,
  ]) {
    assert.doesNotMatch(text, forbidden);
  }
});

test("all static internal navigation destinations exist", () => {
  const source = renderedSurface.map((file) => readFileSync(file, "utf8")).join("\n");
  const hrefs = [...source.matchAll(/href=(?:\{|)["`]\/(?!\/)([^"`?#}]*)/g)].map((match) => match[1]);
  for (const href of new Set(hrefs)) {
    if (!href) continue;
    assert.ok(existsSync(join(root, "src", "app", href, "page.tsx")), `/${href} has a page`);
  }
});
