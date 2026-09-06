import { permanentRedirect } from "next/navigation";

/**
 * Future Nearr-place deep links: /place/<id> on the configured site origin.
 *
 * Nearr doesn't yet support sharing a place link (only sharing the
 * original social video), so there's no backend to fetch place data from
 * here. This route exists so that contract can be added later — for now
 * it attempts the app deep link and otherwise shows a generic,
 * always-correct fallback rather than a 404.
 */
export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  permanentRedirect(`/p/${encodeURIComponent(id)}`);
}
