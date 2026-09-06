import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AppStoreButton } from "@/components/ui/AppStoreButton";

const FLOW = ["Video", "Exact place", "Saved"];

export function Hero() {
  return (
    <section className="topo-dark relative isolate overflow-hidden bg-near-black py-14 text-cream-on-dark sm:py-20 lg:min-h-[760px] lg:py-24">
      <div className="hero-orbit" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.13em] text-orange-bright uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            From post to pin
          </span>

          <h1 className="font-display text-[clamp(2.85rem,7.7vw,5.5rem)] leading-[0.96] font-semibold tracking-[-0.055em] text-balance">
            Find the place behind the video.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-cream-on-dark-soft sm:text-xl">
            Send a Reel or TikTok to Nearr. We identify the real place and
            save it to your map.
          </p>

          <div className="mt-1 flex flex-col items-stretch gap-3 min-[390px]:flex-row min-[390px]:items-center">
            <AppStoreButton source="hero" tone="accent" className="justify-center" />
            <Link
              href="#how-it-works"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/15 px-6 text-sm font-semibold text-cream transition-colors hover:border-orange/70 hover:bg-white/5"
            >
              See how it works
            </Link>
          </div>

          <p className="text-sm text-cream-on-dark-soft">
            Free on the App Store. Built for the places worth remembering.
          </p>
        </div>

        <div className="hero-product relative mx-auto w-full max-w-[570px]">
          <div className="mb-4 grid grid-cols-3 gap-2" aria-label="How Nearr works">
            {FLOW.map((label, index) => (
              <div
                key={label}
                className="flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-cream-on-dark-soft backdrop-blur"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-near-black">
                  {index + 1}
                </span>
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-near-black-elevated shadow-[0_36px_100px_-35px_rgba(255,106,26,.48)]">
            <Image
              src="/images/product/exact-place-ui.png"
              alt="Nearr identifying Uluwatu Clifftop from a social video"
              width={1120}
              height={1950}
              sizes="(max-width: 1023px) calc(100vw - 40px), 570px"
              priority
              className="h-auto w-full"
            />
            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-cream px-3 py-2 text-xs font-bold text-ink shadow-card sm:right-6 sm:bottom-6">
              <span className="pin-pulse h-2.5 w-2.5 rounded-full bg-orange" aria-hidden="true" />
              Exact place found
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
