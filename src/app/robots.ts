import type { MetadataRoute } from "next";
import { absoluteUrl, HAS_CONFIGURED_SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  if (!HAS_CONFIGURED_SITE_URL) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/place/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
