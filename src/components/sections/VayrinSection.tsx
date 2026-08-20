"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VayrinAvatar } from "@/components/ui/VayrinAvatar";
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
      className="bg-near-black py-20 text-cream-on-dark sm:py-28"
    >
      <Container className="flex flex-col items-center gap-10">
        <div
          ref={revealRef}
          className="reveal flex flex-col items-center gap-8"
        >
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Meet Vayrin"
            title="Don't know where it is? Just ask Vayrin."
            body="Vayrin is the part of Nearr that goes looking. Send him a video and he checks what's visible, what's said, what's written, and any location clues buried in the post — then surfaces every credible match, even if a video shows more than one place."
          />

          <div className="flex items-center gap-3 rounded-2xl border border-near-black-border bg-near-black-elevated px-5 py-4">
            <VayrinAvatar state="neutral" className="h-11 w-11 shrink-0" />
            <div className="flex flex-col text-left">
              <p className="text-sm font-semibold text-cream-on-dark">
                Just ask <span className="text-orange-bright">Vayrin</span>.
              </p>
              <p className="text-sm text-cream-on-dark-soft">
                I&apos;ll find the place.
              </p>
            </div>
          </div>
        </div>

        <VayrinDemo />

        <p className="max-w-xl text-center text-sm leading-relaxed text-cream-on-dark-soft">
          For harder videos, Vayrin follows every available clue and
          surfaces his best leads.
        </p>
      </Container>
    </section>
  );
}
