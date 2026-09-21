import { articlesData, getArticleBySlug, ArticleItem } from "@/data/content";
import { detailedBlogArticles, DetailedBlogArticle } from "@/data/blogArticlesDetailed";
import {
  CmsArticleDetail,
  CmsArticleListItem,
  UnifiedArticle,
  UnifiedArticleDetailResult,
} from "@/types/article";
import { getCmsArticles, getCmsArticleBySlug, getCmsArticleSlugs } from "./api";

/**
 * Normalizes a CMS API card item into the standard UnifiedArticle shape.
 */
export function normalizeCmsListItem(cmsItem: CmsArticleListItem): UnifiedArticle {
  return {
    id: `cms-${cmsItem.id}`,
    slug: cmsItem.slug,
    title: cmsItem.title,
    excerpt: cmsItem.excerpt || "",
    fullContent: "",
    pillText: cmsItem.pillText || "معلومات تهمك",
    day: cmsItem.day || "15",
    month: cmsItem.month || "سبتمبر",
    image: cmsItem.image || "/images/garden-costs-faq-banner.webp",
    category: cmsItem.category || "معلومات عن تنسيق الحدائق",
    readTime: cmsItem.readTime || "8 دقائق",
    author: cmsItem.author?.name || "مؤسسة حدائق الريان",
    isCms: true,
  };
}

/**
 * Normalizes a full CMS article detail into matching ArticleItem and DetailedBlogArticle shapes.
 */
export function normalizeCmsArticle(cmsDetail: CmsArticleDetail): {
  article: UnifiedArticle;
  detailed: DetailedBlogArticle;
} {
  const content = cmsDetail.content || {};
  const htmlContent = cmsDetail.htmlContent || content.mainHtml || (typeof content === "string" ? content : null);

  const article: UnifiedArticle = {
    id: `cms-${cmsDetail.id}`,
    slug: cmsDetail.slug,
    title: cmsDetail.title,
    excerpt: cmsDetail.excerpt || "",
    fullContent: content.fullContent || htmlContent || "",
    htmlContent: htmlContent || null,
    pillText: cmsDetail.pillText || "معلومات تهمك",
    day: cmsDetail.date?.day || "15",
    month: cmsDetail.date?.month || "سبتمبر",
    image: cmsDetail.image || "/images/garden-costs-faq-banner.webp",
    category: cmsDetail.category || "معلومات عن تنسيق الحدائق",
    readTime: cmsDetail.readTime || "8 دقائق",
    author: cmsDetail.author?.name || "مؤسسة حدائق الريان",
    isCms: true,
    keywords: cmsDetail.seo?.keywords || [],
  };

  const detailed: DetailedBlogArticle = {
    slug: cmsDetail.slug,
    title: cmsDetail.title,
    subtitle: cmsDetail.subtitle || cmsDetail.excerpt || "",
    readTime: cmsDetail.readTime || "8 دقائق",
    metaDescription: cmsDetail.seo?.metaDescription || cmsDetail.excerpt || "",
    author: {
      name: cmsDetail.author?.name || "مؤسسة حدائق الريان",
      role: cmsDetail.author?.role || "مهندس لاندسكيب وتصميم حدائق",
      avatar: cmsDetail.author?.avatar || "/images/rabea-shaban-profile.webp",
    },
    tableOfContents: content.tableOfContents || [],
    introduction: content.introduction || [],
    keyTakeaways: content.keyTakeaways || [],
    sections: (content.sections || []).map((sec, idx) => ({
      id: sec.id || `sec-${idx + 1}`,
      numTitle: sec.numTitle || "",
      paragraphs: sec.paragraphs || [],
      bullets: sec.bullets || [],
      highlightBox: sec.highlightBox,
      subsections: (sec.subsections || []).map((sub) => ({
        subtitle: sub.subtitle || "",
        paragraphs: sub.paragraphs || [],
        bullets: sub.bullets || [],
      })),
    })),
    comparisonTable: content.comparisonTable || undefined,
    fatalMistakes: content.fatalMistakes || [],
    faqs: content.faqs || [],
    conclusion: content.conclusion || [],
    summaryBox:
      content.summaryBox ||
      "احصل الآن على معاينة مجانية وتصميم 3D لحديقة منزلك مع ضمان معتمد حتى 7 سنوات وأسعار تنافسية تناسب ميزانيتك في كافة أحياء الرياض.",
  };

  return { article, detailed };
}

/**
 * Combines CMS articles and Static articles.
 *
 * Rules:
 * 1. CMS articles appear first.
 * 2. Static articles appear second.
 * 3. If a slug exists in both CMS and Static data, the CMS article takes precedence and the duplicate static version is excluded.
 * 4. If Laravel API is unreachable, falls back seamlessly to static articles without crashing.
 */
export async function getUnifiedArticles(): Promise<UnifiedArticle[]> {
  try {
    const cmsArticles = await getCmsArticles();
    const cmsNormalized = cmsArticles.map(normalizeCmsListItem);

    const cmsSlugs = new Set(cmsNormalized.map((a) => a.slug));

    // Filter out duplicate static articles if CMS version exists
    const nonConflictingStatic = (articlesData as UnifiedArticle[]).filter(
      (staticArticle) => !cmsSlugs.has(staticArticle.slug)
    );

    return [...cmsNormalized, ...nonConflictingStatic];
  } catch (err) {
    // Graceful fallback to static articles
    return articlesData as UnifiedArticle[];
  }
}

/**
 * Synchronous resolver for static articles fallback when running in client or pure static mode.
 */
export function getStaticArticlesSync(): UnifiedArticle[] {
  return articlesData as UnifiedArticle[];
}

/**
 * Resolves an individual article:
 * 1. Queries Laravel CMS API first.
 * 2. If found, returns normalized CMS article.
 * 3. If not found or API is offline, falls back to Static articles (`getArticleBySlug` & `detailedBlogArticles`).
 */
export async function getUnifiedArticleBySlug(
  slug: string
): Promise<UnifiedArticleDetailResult | null> {
  const decodedSlug = decodeURIComponent(slug || "");

  // 1. Check CMS API first
  try {
    const cmsDetail = await getCmsArticleBySlug(decodedSlug);
    if (cmsDetail) {
      const { article, detailed } = normalizeCmsArticle(cmsDetail);
      return {
        article,
        detailed,
        seo: cmsDetail.seo,
        isCms: true,
      };
    }
  } catch (err) {
    // Continue to static fallback
  }

  // 2. Static Fallback
  const staticArticle =
    getArticleBySlug(decodedSlug) ||
    getArticleBySlug(slug) ||
    (articlesData.find((a) => a.slug === decodedSlug || a.slug === slug) as UnifiedArticle | undefined);

  const staticDetailed =
    detailedBlogArticles[decodedSlug] ||
    detailedBlogArticles[slug] ||
    null;

  if (staticArticle || staticDetailed) {
    const finalArticle: UnifiedArticle = staticArticle
      ? { ...staticArticle, isCms: false }
      : {
          id: `static-${staticDetailed!.slug}`,
          slug: staticDetailed!.slug,
          title: staticDetailed!.title,
          excerpt: staticDetailed!.subtitle || "",
          fullContent: "",
          pillText: "معلومات تهمك",
          day: "15",
          month: "سبتمبر",
          image: "/images/garden-costs-faq-banner.webp",
          category: "معلومات عن تنسيق الحدائق",
          readTime: staticDetailed!.readTime || "8 دقائق",
          author: staticDetailed!.author?.name || "مؤسسة حدائق الريان",
          isCms: false,
        };

    return {
      article: finalArticle,
      detailed: staticDetailed,
      seo: null,
      isCms: false,
    };
  }

  return null;
}

/**
 * Collects all static and CMS slugs for `generateStaticParams()` and Sitemap generation.
 * Deduplicates using a Set.
 */
export async function getAllUnifiedSlugs(): Promise<string[]> {
  const slugsSet = new Set<string>();

  // 1. Static slugs
  articlesData.forEach((article) => {
    if (article.slug) {
      slugsSet.add(article.slug);
    }
  });

  Object.keys(detailedBlogArticles).forEach((slugKey) => {
    if (slugKey) {
      slugsSet.add(slugKey);
    }
  });

  // 2. CMS slugs
  try {
    const cmsSlugs = await getCmsArticleSlugs();
    cmsSlugs.forEach((s) => {
      if (s) {
        slugsSet.add(s);
      }
    });
  } catch (err) {
    // Ignore and proceed with static slugs
  }

  return Array.from(slugsSet);
}
