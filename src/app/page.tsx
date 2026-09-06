import { Hero } from "@/components/sections/Hero";
import { GatekeepingSection } from "@/components/sections/GatekeepingSection";
import { SaveFlowSection } from "@/components/sections/SaveFlowSection";
import { ExactPlaceSection } from "@/components/sections/ExactPlaceSection";
import { MapMemorySection } from "@/components/sections/MapMemorySection";
import { BeyondSaveSection } from "@/components/sections/BeyondSaveSection";
import { SharingSection } from "@/components/sections/SharingSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { createPageMetadata, HOME_TITLE } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: HOME_TITLE,
  description:
    "Find places from TikTok and Instagram, save them to your map, get reminded when you're nearby, and share places with friends.",
  path: "/",
});

export default function Home() {
  return (
    <>
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
