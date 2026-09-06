import Image from "next/image";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    number: "01",
    title: "See it",
    body: "A place catches your eye in TikTok or Instagram.",
  },
  {
    number: "02",
    title: "Send it",
    body: "Choose Nearr from the share sheet you already use.",
  },
  {
    number: "03",
    title: "Saved",
    body: "Nearr finds the place and adds it to your map.",
  },
] as const;

export function SaveFlowSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="order-2 mx-auto w-full max-w-[430px] lg:order-1">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-cream shadow-card">
            <Image
              src="/images/marketing/how-it-works-share-to-nearr.webp"
              alt="The iPhone share sheet with Nearr selected for an Instagram Reel"
              width={720}
              height={1279}
              sizes="(max-width: 1023px) calc(100vw - 40px), 430px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <span className="text-xs font-bold tracking-[0.16em] text-orange-deep uppercase">
              How it works
            </span>
            <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              See it. Send it. Saved.
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              No new tab maze. No copying captions into search. One share turns
              a video into a real place you can visit.
            </p>
          </div>

          <ol className="grid gap-3">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border bg-cream p-5"
              >
                <span className="font-display text-sm font-bold text-orange-deep">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
