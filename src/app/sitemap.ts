import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/config/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date("2026-02-24"),
    changeFrequency: "monthly" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }));

  const privacyPages = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/privacy`,
    lastModified: new Date("2026-02-24"),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...mainPages, ...privacyPages];
}
