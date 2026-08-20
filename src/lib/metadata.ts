import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./config";

export const HOME_TITLE = "Find the places you see online";
export const SOCIAL_IMAGE_PATH = "/opengraph-image";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

/** Builds consistent canonical, Open Graph, and Twitter metadata per route. */
export function createPageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle =
    title === HOME_TITLE
      ? `${siteConfig.name} \u2014 ${title}`
      : `${title} \u2014 ${siteConfig.name}`;

  return {
    title: title === HOME_TITLE ? { absolute: socialTitle } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: "Nearr \u2014 Find the places you see online",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE_PATH],
    },
    robots: {
      index,
      follow: true,
    },
  };
}
