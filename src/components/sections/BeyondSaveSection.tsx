import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function BeyondSaveSection() {
  return (
    <section id="features" className="topo-dark scroll-mt-24 overflow-hidden bg-near-black py-20 text-cream-on-dark sm:py-28">
      <Container className="flex flex-col gap-20 sm:gap-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold tracking-[0.16em] text-orange-bright uppercase">
            After the save
          </span>
          <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            A save is just the start.
          </h2>
          <p className="text-lg leading-relaxed text-cream-on-dark-soft">
            Nearr turns a collection of links into a map that becomes useful
            in the real world.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10 text-xl text-orange" aria-hidden="true">◎</span>
            <h3 className="font-display text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
              Remember it when you&apos;re actually nearby.
            </h3>
            <p className="text-lg leading-relaxed text-cream-on-dark-soft">
              Saving a place is only useful if you remember it. Nearr can
              notify you when you&apos;re near somewhere you previously saved.
            </p>
            <div className="notification-card mt-2 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-card backdrop-blur">
              <div className="flex items-start gap-3">
                <Image src="/brand/app-icon-256.png" alt="" width={42} height={42} className="rounded-xl" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 text-xs text-cream-on-dark-soft">
                    <span className="font-bold tracking-wide uppercase">Nearr</span>
                    <span>now</span>
                  </div>
                  <p className="mt-1 font-semibold text-cream">You&apos;re near a saved place</p>
                  <p className="text-sm text-cream-on-dark-soft">Hidden Falls is 0.3 mi away.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[510px] overflow-hidden rounded-[2rem] border border-white/10 bg-near-black-elevated shadow-[0_32px_90px_-36px_rgba(255,106,26,.55)]">
            <Image
              src="/images/product/nearby-ui.png"
              alt="Nearr showing a nearby reminder for Hidden Falls and an Explore nearby card"
              width={1250}
              height={1800}
              sizes="(max-width: 1023px) calc(100vw - 40px), 510px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 mx-auto w-full max-w-[510px] overflow-hidden rounded-[2rem] border border-white/10 bg-near-black-elevated shadow-[0_32px_90px_-36px_rgba(255,106,26,.55)] lg:order-1">
            <Image
              src="/images/product/discover-ui.png"
              alt="A Nearr saved-place page showing nearby waterfalls, lakes, and parks"
              width={1120}
              height={1950}
              sizes="(max-width: 1023px) calc(100vw - 40px), 510px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>

          <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10 text-xl text-orange" aria-hidden="true">↗</span>
            <h3 className="font-display text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
              One place can lead to another.
            </h3>
            <p className="text-lg leading-relaxed text-cream-on-dark-soft">
              Open a saved place to see what else is around it. Explore nearby
              hikes, food, landmarks, and hidden spots without starting your
              search over.
            </p>
            <div className="flex gap-2 text-xs font-bold text-cream-on-dark-soft" aria-label="Discovery actions">
              <span className="rounded-full border border-white/10 px-3 py-2">Also nearby</span>
              <span className="rounded-full border border-white/10 px-3 py-2">Explore nearby</span>
              <span className="rounded-full border border-white/10 px-3 py-2">See map</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
