import { Hero } from "@/components/sections/Hero";
import { VayrinSection } from "@/components/sections/VayrinSection";
import { SaveFlowSection } from "@/components/sections/SaveFlowSection";
import { MapMemorySection } from "@/components/sections/MapMemorySection";
import { NearbyReminderSection } from "@/components/sections/NearbyReminderSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <VayrinSection />
      <SaveFlowSection />
      <MapMemorySection />
      <NearbyReminderSection />
      <ProblemSection />
      <Testimonials />
      <FinalCta />
    </>
  );
}
