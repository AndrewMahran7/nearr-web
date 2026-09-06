import type { Metadata } from "next";
import { CreatorBanner } from "@/components/CreatorBanner";
import { Hero } from "@/components/sections/Hero";
import { GatekeepingSection } from "@/components/sections/GatekeepingSection";
import { SaveFlowSection } from "@/components/sections/SaveFlowSection";
import { ExactPlaceSection } from "@/components/sections/ExactPlaceSection";
import { MapMemorySection } from "@/components/sections/MapMemorySection";
import { BeyondSaveSection } from "@/components/sections/BeyondSaveSection";
import { SharingSection } from "@/components/sections/SharingSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { normalizeCreatorHandle } from "@/lib/attribution";
import { siteConfig } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";

/**
 * Attributable creator campaign pages reuse the homepage story. They are
 * noindex and canonicalize to the homepage to avoid duplicate search results.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ creator: string }>;
}): Promise<Metadata> {
  const { creator } = await params;
  const handle = normalizeCreatorHandle(creator);

  return createPageMetadata({
    title: `via @${handle}`,
    description: siteConfig.description,
    path: "/",
    index: false,
  });
}

export default async function CreatorLandingPage({
  params,
}: {
  params: Promise<{ creator: string }>;
}) {
  const { creator } = await params;
  const handle = normalizeCreatorHandle(creator);

  return (
    <>
      <CreatorBanner creator={handle} />
      <Hero />
      <GatekeepingSection />
      <SaveFlowSection />
      <ExactPlaceSection />
      <MapMemorySection />
      <BeyondSaveSection />
      <SharingSection />
      <FinalCta />
    </>
  );
}
