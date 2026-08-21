"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

const STEPS = [
  {
    title: "See somewhere you want to go",
    body: "Scrolling social media and something catches your eye.",
    icon: SparkIcon,
  },
  {
    title: "Tap Share",
    body: "Use the native share button, just like sending it to a friend.",
    icon: ShareIcon,
  },
  {
    title: "Choose Nearr",
    body: "Pick Nearr from the share sheet. That's the whole action.",
    icon: null,
  },
  {
    title: "It's on your map",
    body: "Vayrin finds the place, then Nearr drops a pin — ready whenever you're close.",
    icon: PinIcon,
  },
] as const;

export function SaveFlowSection() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          eyebrow="The everyday move"
          title="See it. Share it. It's on your map."
          body="No new app habit to learn — it works with how you already save things."
        />

        <div className="relative mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-12">
          <FlowVisual
            src="/images/marketing/how-it-works-share-to-nearr.webp"
            alt="Sharing an Instagram Reel to Nearr"
            label="Share the post to Nearr"
          />
          <div
            aria-hidden="true"
            className="mx-auto flex h-10 w-10 rotate-90 items-center justify-center rounded-full border border-orange/25 bg-orange/10 text-orange-deep sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rotate-0"
          >
            <ArrowIcon className="h-5 w-5" />
          </div>
          <FlowVisual
            src="/images/marketing/how-it-works-quick-check.webp"
            alt="Nearr Quick Check showing a Lake Powell place result"
            label="Check the result before saving"
          />
        </div>

        <div
          ref={revealRef}
          className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-paper p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange/10 text-orange-deep">
                  {step.icon ? (
                    <step.icon className="h-[18px] w-[18px]" />
                  ) : (
                    <Image
                      src="/brand/app-icon-256.png"
                      alt=""
                      width={22}
                      height={22}
                      className="rounded-[6px]"
                    />
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FlowVisual({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[360px] overflow-hidden rounded-[1.75rem] border border-border bg-cream shadow-card">
        <Image
          src={src}
          alt={alt}
          width={720}
          height={1279}
          sizes="(max-width: 639px) calc(100vw - 64px), 360px"
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="text-sm font-semibold text-ink">
        {label}
      </figcaption>
    </figure>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v12" />
      <path d="M7 8l5-5 5 5" />
      <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
