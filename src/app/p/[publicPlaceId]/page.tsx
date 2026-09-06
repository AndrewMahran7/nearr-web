import type { Metadata } from "next";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { absoluteUrl } from "@/lib/config";
import {
  getPublicPlace,
  placeLocation,
  publicPlaceEventUrl,
  sanitizeReferralId,
} from "@/lib/public-place";
import { PlaceActions } from "./PlaceActions";

type Props = {
  params: Promise<{ publicPlaceId: string }>;
  searchParams: Promise<{ ref?: string | string[] }>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { publicPlaceId } = await params;
  const query = await searchParams;
  const referralId = sanitizeReferralId(first(query.ref));
  const place = await getPublicPlace(publicPlaceId, referralId);
  if (!place) return { title: "Place not found", robots: { index: false, follow: true } };

  const location = place.locality || place.region || place.country;
  const title = `${place.name} on Nearr`;
  const description = location
    ? `Discover ${place.name} in ${location} on Nearr.`
    : `Discover ${place.name} on Nearr.`;
  const canonical = absoluteUrl(`/p/${place.publicId}`);
  const image = place.heroImage || "/opengraph-image";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Nearr",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${place.name} on Nearr` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: place.available, follow: true },
  };
}

export default async function PublicPlacePage({ params, searchParams }: Props) {
  const { publicPlaceId } = await params;
  const query = await searchParams;
  const referralId = sanitizeReferralId(first(query.ref));
  const place = await getPublicPlace(publicPlaceId, referralId);
  if (!place) notFound();

  if (place.redirected && place.publicId !== publicPlaceId.toLowerCase()) {
    const destination = new URL(`/p/${place.publicId}`, absoluteUrl("/"));
    if (referralId) destination.searchParams.set("ref", referralId);
    permanentRedirect(`${destination.pathname}${destination.search}`);
  }

  const location = placeLocation(place);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.latitude},${place.longitude}`)}`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.name,
    address: place.displayAddress || undefined,
    geo: { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude },
    url: absoluteUrl(`/p/${place.publicId}`),
  }).replace(/</g, "\\u003c");

  return (
    <div className="relative overflow-hidden py-8 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_10%,rgba(255,106,26,0.18),transparent_68%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Container className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <section className="relative min-h-72 overflow-hidden rounded-[2rem] border border-near-black-border bg-near-black p-7 text-cream shadow-card sm:min-h-[30rem] sm:p-10">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,242,239,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,242,239,.08)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="absolute top-[35%] left-[58%] h-28 w-28 rounded-full bg-orange/20 blur-2xl" />
          <div className="absolute top-[40%] left-[64%] -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange/40 bg-near-black-elevated shadow-card">
              <svg viewBox="0 0 24 24" width="42" height="42" fill="none" aria-hidden="true">
                <path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z" fill="#FF6A1A" />
                <circle cx="12" cy="9" r="2.6" fill="#0F1014" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 flex h-full min-h-64 flex-col justify-between sm:min-h-[25rem]">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-orange uppercase">
              <Image src="/brand/app-icon-256.png" alt="" width={28} height={28} className="rounded-lg" />
              Nearr place
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-cream-on-dark-soft">
                {place.placeType || place.category || "A place worth remembering"}
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
                {place.name}
              </h1>
              <p className="mt-3 text-base text-cream-on-dark-soft sm:text-lg">{location}</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-between gap-7 rounded-[2rem] border border-border bg-paper p-6 shadow-soft sm:p-9">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-orange-deep uppercase">Shared on Nearr</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">Keep this one on your map.</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Save places you find online and remember them on your map.
              </p>
            </div>

            {place.displayAddress ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer external" className="flex min-h-12 items-start gap-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink transition-colors hover:bg-cream-elevated">
                <span className="mt-0.5 text-orange" aria-hidden="true">●</span>
                <span>{place.displayAddress}</span>
              </a>
            ) : null}
          </div>

          <PlaceActions
            publicPlaceId={place.publicId}
            referralId={referralId}
            eventUrl={publicPlaceEventUrl(place.publicId, referralId)}
          />
          <p className="text-center text-xs leading-relaxed text-ink-muted">
            You can see this place without an account. Sign in only when you choose to save it.
          </p>
        </section>
      </Container>
    </div>
  );
}
