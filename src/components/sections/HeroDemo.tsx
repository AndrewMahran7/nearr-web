"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STEPS = [
  { label: "A video someone sent you", key: "video" },
  { label: "Shared to Nearr", key: "share" },
  { label: "Following the clues", key: "analyzing" },
  { label: "Found it — saved to your map", key: "result" },
] as const;

const STEP_MS = 2800;

export function HeroDemo() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) return;

    if (paused) return;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative mx-auto flex w-full max-w-sm flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Status pill */}
      <div
        className="relative z-10 mb-5 min-h-[2.25rem] rounded-full border border-border bg-paper px-4 py-2 text-center text-sm font-medium text-ink shadow-soft"
        aria-live="polite"
      >
        {STEPS[step].label}
      </div>

      <div className="relative aspect-[9/18.5] w-[280px] sm:w-[300px]">
        {/* Floating clue chips, step 2 only */}
        <ClueChip
          text="Visual clue"
          className="-left-16 top-[18%] -rotate-6"
          visible={step === 2}
          delay="0ms"
        />
        <ClueChip
          text="Caption clue"
          className="-right-16 top-[38%] rotate-6"
          visible={step === 2}
          delay="150ms"
        />
        <ClueChip
          text="Audio clue"
          className="-left-14 top-[62%] -rotate-3"
          visible={step === 2}
          delay="300ms"
        />
        {/* Saved badge, step 3 only */}
        <div
          className={`absolute -right-6 top-[12%] z-20 flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-cream shadow-soft transition-all duration-500 ${
            step === 3
              ? "translate-y-0 rotate-3 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Saved
        </div>

        {/* Device stage */}
        <div className="h-full w-full overflow-hidden rounded-[2.25rem] border border-border bg-paper p-2 shadow-card">
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-near-black">
            <VideoPanel active={step === 0} />
            <SharePanel active={step === 1} />
            <AnalyzingPanel active={step === 2} />
            <ResultPanel active={step === 3} />
          </div>
        </div>
      </div>

      {/* Step dots */}
      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Show step: ${s.label}`}
            aria-current={i === step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-6 bg-orange" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Panel({
  active,
  className = "",
  children,
}: {
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      } ${className}`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function VideoPanel({ active }: { active: boolean }) {
  return (
    <Panel active={active}>
      <div
        className="relative flex h-full flex-col justify-end"
        style={{
          background:
            "linear-gradient(160deg, #3a2f22 0%, #6b4a2b 38%, #c98a4b 68%, #f2c98a 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
        <div className="absolute left-1/2 top-[38%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <PlayIcon className="ml-1 h-6 w-6 text-white" />
        </div>
        <div className="relative flex flex-col gap-1.5 p-4 text-white">
          <p className="text-xs font-medium text-white/70">from a Reel</p>
          <p className="text-sm leading-snug font-medium">
            &ldquo;no idea where this is but I need to go 😍&rdquo;
          </p>
        </div>
        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-1 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <ShareIcon className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-medium">Share</span>
        </div>
      </div>
    </Panel>
  );
}

function SharePanel({ active }: { active: boolean }) {
  return (
    <Panel active={active} className="justify-end bg-near-black">
      <div className="rounded-t-[1.5rem] bg-[#1c1c1e] p-4 pb-6">
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-white/20" />
        <p className="mb-4 text-center text-xs font-medium text-white/70">
          Share
        </p>
        <div className="flex items-center justify-between px-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="h-11 w-11 rounded-full bg-white/10" />
              <span className="h-1.5 w-8 rounded-full bg-white/10" />
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-orange shadow-[0_0_0_3px_rgba(255,106,26,0.35)]">
              <Image
                src="/brand/app-icon-256.png"
                alt=""
                width={44}
                height={44}
                className="h-full w-full rounded-[13px] object-cover"
              />
            </span>
            <span className="text-[10px] font-semibold text-white">
              Nearr
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AnalyzingPanel({ active }: { active: boolean }) {
  return (
    <Panel
      active={active}
      className="items-center justify-center gap-4 bg-near-black px-8 text-center"
    >
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute h-full w-full animate-spin rounded-full border-2 border-orange/25 border-t-orange" />
      </span>
      <p className="text-sm font-medium text-cream-on-dark">
        Following the clues
      </p>
      <p className="text-xs leading-relaxed text-cream-on-dark-soft">
        Looking at what&apos;s visible, what&apos;s said, and what&apos;s
        written.
      </p>
    </Panel>
  );
}

function ResultPanel({ active }: { active: boolean }) {
  return (
    <Panel active={active} className="justify-end bg-near-black">
      <div
        className="h-[62%] w-full"
        style={{
          background:
            "linear-gradient(160deg, #2f3a2e 0%, #4a6b3f 45%, #8ab04b 75%, #d8e8a8 100%)",
        }}
      />
      <div className="flex-1 rounded-t-[1.5rem] bg-paper p-4">
        <span className="mb-2 inline-flex w-fit items-center rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-orange-deep uppercase">
          Outdoors &middot; Beach
        </span>
        <p className="text-base font-semibold text-ink">Hidden Cove Beach</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          Not named in the caption
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
          <CheckIcon className="h-3.5 w-3.5" />
          Saved to your map
        </div>
      </div>
    </Panel>
  );
}

function ClueChip({
  text,
  className,
  visible,
  delay,
}: {
  text: string;
  className: string;
  visible: boolean;
  delay: string;
}) {
  return (
    <div
      className={`absolute z-20 hidden rounded-full border border-border bg-paper px-3 py-1.5 text-xs font-medium text-ink shadow-soft transition-all duration-500 sm:block ${className} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{ transitionDelay: visible ? delay : "0ms" }}
    >
      {text}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
