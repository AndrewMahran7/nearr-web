"use client";

import { APP_STORE_URL } from "@/lib/config";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

type SharedCtaEvent =
  | "shared_place_save_cta"
  | "shared_place_open_in_app_cta"
  | "shared_place_get_app_cta";

export function PlaceActions({
  publicPlaceId,
  referralId,
  eventUrl,
}: {
  publicPlaceId: string;
  referralId: string | null;
  eventUrl: string;
}) {
  const record = (eventName: SharedCtaEvent) => {
    const properties = { public_place_id: publicPlaceId, ...(referralId ? { referral_id: referralId } : {}) };
    track(eventName, properties);
    void fetch(eventUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, referralId, channel: "web" }),
      keepalive: true,
    }).catch(() => undefined);
  };

  const openApp = (action?: "save") => {
    const deepLink = new URL(`nearr://p/${publicPlaceId}`);
    if (referralId) deepLink.searchParams.set("ref", referralId);
    if (action) deepLink.searchParams.set("action", action);
    record(action ? ANALYTICS_EVENTS.SHARED_PLACE_SAVE_CTA : ANALYTICS_EVENTS.SHARED_PLACE_OPEN_IN_APP_CTA);

    let hidden = false;
    const visibility = () => { if (document.hidden) hidden = true; };
    document.addEventListener("visibilitychange", visibility, { once: true });
    window.location.href = deepLink.toString();
    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", visibility);
      if (!hidden && !document.hidden) window.location.href = APP_STORE_URL;
    }, 1300);
  };

  return (
    <div className="grid w-full gap-3">
      <button
        type="button"
        onClick={() => openApp()}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-ink px-5 py-3.5 text-base font-semibold text-cream shadow-soft transition-transform hover:-translate-y-0.5"
      >
        Open in Nearr
      </button>
      <button
        type="button"
        onClick={() => openApp("save")}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange px-5 py-3.5 text-base font-semibold text-near-black shadow-soft transition-transform hover:-translate-y-0.5"
      >
        Save to my map
      </button>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer external"
        onClick={() => record(ANALYTICS_EVENTS.SHARED_PLACE_GET_APP_CTA)}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-border bg-paper px-5 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink/30"
      >
        Get Nearr
      </a>
    </div>
  );
}

