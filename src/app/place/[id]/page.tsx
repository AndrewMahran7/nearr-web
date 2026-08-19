import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { OpenInApp } from "./OpenInApp";

/**
 * Future Nearr-place deep links: nearr.app/place/<id>.
 *
 * Nearr doesn't yet support sharing a place link (only sharing the
 * original social video), so there's no backend to fetch place data from
 * here. This route exists so that contract can be added later — for now
 * it attempts the app deep link and otherwise shows a generic,
 * always-correct fallback rather than a 404.
 */
export const metadata: Metadata = {
  title: "Open in Nearr",
  robots: { index: false, follow: true },
};

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-1 items-center py-20 sm:py-28">
      <Container className="flex max-w-md flex-col items-center gap-6 text-center">
        <OpenInApp id={id} />
        <Image
          src="/brand/app-icon-256.png"
          alt=""
          width={64}
          height={64}
          className="rounded-2xl shadow-card"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-semibold text-ink">
            This place lives in Nearr
          </h1>
          <p className="text-base leading-relaxed text-ink-soft">
            Shared place links open right in the app. Get Nearr to see the
            details, save it to your map, and get reminded when
            you&apos;re nearby.
          </p>
        </div>
        <AppStoreButton source="place_fallback" />
      </Container>
    </div>
  );
}
