import { Hero } from "@/components/sections/Hero";
import { VayrinSection } from "@/components/sections/VayrinSection";
import { SaveFlowSection } from "@/components/sections/SaveFlowSection";
import { MapMemorySection } from "@/components/sections/MapMemorySection";
import { NearbyReminderSection } from "@/components/sections/NearbyReminderSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { createPageMetadata, HOME_TITLE } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: HOME_TITLE,
  description:
    "Share an Instagram, TikTok, or Facebook video to Nearr. Vayrin finds the place, then Nearr saves it to your map.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <VayrinSection />
      <SaveFlowSection />
      <MapMemorySection />
      <NearbyReminderSection />
      <Testimonials />
      <FinalCta />
    </>
  );
}
