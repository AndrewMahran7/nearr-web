import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  HAS_CONFIGURED_SITE_URL,
  INDEXABLE_ROUTES,
} from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!HAS_CONFIGURED_SITE_URL) return [];

  return INDEXABLE_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.5,
  }));
}
