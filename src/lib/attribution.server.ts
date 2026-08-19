import "server-only";
import { cookies } from "next/headers";
import {
  ATTRIBUTION_COOKIE_NAME,
  parseAttributionCookie,
  type AttributionData,
} from "./attribution";

/** Server Component / Route Handler read of the attribution cookie. */
export async function getServerAttribution(): Promise<AttributionData> {
  const store = await cookies();
  return parseAttributionCookie(store.get(ATTRIBUTION_COOKIE_NAME)?.value);
}
