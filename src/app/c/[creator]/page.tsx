import type { Metadata } from "next";
import { CreatorBanner } from "@/components/CreatorBanner";
import { Hero } from "@/components/sections/Hero";
import { ShazamSection } from "@/components/sections/ShazamSection";
import { SaveFlowSection } from "@/components/sections/SaveFlowSection";
import { MapMemorySection } from "@/components/sections/MapMemorySection";
import { NearbyReminderSection } from "@/components/sections/NearbyReminderSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Creator landing pages: nearr.app/c/<creator>.
 *
 * Visiting this route tags the visitor's attribution cookie with
 * `creator=<slug>` (see src/proxy.ts) even without a `?creator=` query
 * param, then renders the same homepage story with a small attribution
 * banner up top. This is intentionally the same content as `/` — the goal
 * right now is a working, attributable link creators can share, not a
 * bespoke per-creator CMS. Per-creator copy/imagery can be layered in here
 * later without changing the route contract.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ creator: string }>;
}): Promise<Metadata> {
  const { creator } = await params;
  return {
    title: `Nearr — via @${creator}`,
  };
}

export default async function CreatorLandingPage({
  params,
}: {
  params: Promise<{ creator: string }>;
}) {
  const { creator } = await params;

  return (
    <>
      <CreatorBanner creator={creator} />
      <Hero />
      <ShazamSection />
      <SaveFlowSection />
      <MapMemorySection />
      <NearbyReminderSection />
      <ProblemSection />
      <Testimonials />
      <FinalCta />
    </>
  );
}
