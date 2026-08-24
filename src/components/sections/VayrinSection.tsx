"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VayrinDemo } from "./VayrinDemo";
import { useSectionView } from "@/lib/useSectionView";
import { useReveal } from "@/lib/useReveal";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export function VayrinSection() {
  const viewRef = useSectionView<HTMLElement>(
    ANALYTICS_EVENTS.VAYRIN_SECTION_VIEWED,
  );
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="vayrin"
      ref={viewRef}
      className="scroll-mt-24 bg-near-black py-20 text-cream-on-dark sm:py-28"
    >
      <Container className="flex flex-col items-center gap-10">
        <div
          ref={revealRef}
          className="reveal flex flex-col items-center gap-8"
        >
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Real videos. Real places."
            title="Share the video. Get the place."
            body="Vayrin watches the video and works out where it was filmed. These examples come from public posts that Nearr identified correctly."
          />
        </div>

        <VayrinDemo />

        <p className="max-w-xl text-center text-sm leading-relaxed text-cream-on-dark-soft">
          When a video is ambiguous, Nearr asks you to confirm before it saves.
        </p>
      </Container>
    </section>
  );
}
