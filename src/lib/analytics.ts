import { getClientAttribution } from "./attribution";

/**
 * Analytics interface — not a vendor integration.
 *
 * No analytics vendor is wired up yet (none is clearly chosen for Nearr).
 * `track()` is the single call site every component should use, so wiring
 * in a real vendor later (PostHog, Plausible, a first-party endpoint, …)
 * means editing this one function instead of hunting through components.
 */
export const ANALYTICS_EVENTS = {
  LANDING_VIEW: "landing_view",
  APP_STORE_CTA_CLICKED: "app_store_cta_clicked",
  SHAZAM_SECTION_VIEWED: "shazam_section_viewed",
  SAVE_FLOW_SECTION_VIEWED: "save_flow_section_viewed",
  MAP_SECTION_VIEWED: "map_section_viewed",
  CREATOR_LANDING_VIEWED: "creator_landing_viewed",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type AnalyticsProperties = Record<
  string,
  string | number | boolean | undefined
>;

export function track(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
) {
  const attribution = getClientAttribution();
  const payload = {
    event,
    properties: { ...attribution, ...properties },
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", payload);
  }

  // TODO: forward `payload` to the chosen analytics/attribution backend
  // once one exists (e.g. `fetch("/api/events", { method: "POST", body: ... })`
  // or a vendor SDK call). Every event already carries first-touch
  // attribution, so no call site needs to look it up separately.
}
