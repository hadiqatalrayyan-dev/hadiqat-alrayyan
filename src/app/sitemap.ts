import { MetadataRoute } from "next";
import { services, articlesData } from "@/data/content";
import { getCmsArticleSlugs } from "@/lib/api";

export const dynamic = "force-static";

const BASE_URL = "https://hadiqat-alrayan.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // 1. Core Main Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/portfolio/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // 2. Service Pages (12 Services)
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Articles (Static + Published CMS)
  const articleUrlsMap = new Map<string, MetadataRoute.Sitemap[number]>();

  // Static articles first
  articlesData.forEach((a) => {
    if (a.slug) {
      const slug = a.slug.replace(/^\/+|\/+$/g, "");
      articleUrlsMap.set(slug, {
        url: `${BASE_URL}/blog/${slug}/`,
        lastModified: "2026-01-15T08:00:00+03:00",
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  });

  // CMS articles overwrite / add with latest date
  try {
    const cmsSlugs = await getCmsArticleSlugs();
    cmsSlugs.forEach((slug) => {
      if (slug) {
        const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
        articleUrlsMap.set(cleanSlug, {
          url: `${BASE_URL}/blog/${cleanSlug}/`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    });
  } catch (err) {
    // Gracefully continue with static articles
  }

  const articlePages: MetadataRoute.Sitemap = Array.from(articleUrlsMap.values());

  return [...corePages, ...servicePages, ...articlePages];
}
