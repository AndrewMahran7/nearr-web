"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

export function NearbyReminderSection() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          eyebrow="Right place, right time"
          title="Save now. Get reminded later."
          body="Places you save don't have to stay stuck in your feed. When you're nearby, Nearr can quietly let you know — so the spot you found three months ago actually gets visited."
        />

        <div ref={revealRef} className="reveal flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-[1.5rem] border border-border bg-paper p-4 shadow-card">
            <div className="flex items-start gap-3">
              <Image
                src="/brand/app-icon-256.png"
                alt=""
                width={40}
                height={40}
                className="rounded-[10px]"
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
                    Nearr
                  </span>
                  <span className="text-xs text-ink-muted">now</span>
                </div>
                <p className="text-sm font-semibold text-ink">
                  You&apos;re near Hidden Cove Beach
                </p>
                <p className="text-sm leading-snug text-ink-soft">
                  You saved this 3 weeks ago from a Reel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
