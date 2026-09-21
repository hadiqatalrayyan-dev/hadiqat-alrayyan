import { ArticleItem } from "@/data/content";
import { DetailedBlogArticle } from "@/data/blogArticlesDetailed";

/**
 * Author structure returned by Laravel CMS API.
 */
export interface CmsAuthor {
  name: string;
  role: string;
  avatar: string;
}

/**
 * Date structure returned by Laravel CMS API.
 */
export interface CmsDate {
  day: string;
  month: string;
}

/**
 * SEO metadata structure returned by Laravel CMS API.
 */
export interface CmsSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string[];
  canonicalUrl?: string | null;
  ogImage?: string | null;
}

/**
 * Section item structure returned by Laravel CMS API.
 */
export interface CmsSection {
  id?: string;
  numTitle?: string;
  paragraphs?: string[];
  bullets?: string[];
  highlightBox?: string;
  subsections?: {
    subtitle: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
}

/**
 * Comparison table structure returned by Laravel CMS API.
 */
export interface CmsComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

/**
 * FAQ item structure returned by Laravel CMS API.
 */
export interface CmsFaq {
  question: string;
  answer: string;
}

/**
 * Table of contents entry returned by Laravel CMS API.
 */
export interface CmsTableOfContent {
  id: string;
  title: string;
}

/**
 * Structured content block container returned by Laravel CMS API.
 */
export interface CmsContentBlocks {
  mainHtml?: string | null;
  tableOfContents?: CmsTableOfContent[];
  introduction?: string[];
  keyTakeaways?: string[];
  sections?: CmsSection[];
  comparisonTable?: CmsComparisonTable | null;
  fatalMistakes?: string[];
  faqs?: CmsFaq[];
  conclusion?: string[];
  summaryBox?: string | null;
  fullContent?: string | null;
}

/**
 * Card-level article representation from GET /api/v1/articles.
 */
export interface CmsArticleListItem {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  pillText: string;
  day: string;
  month: string;
  image: string;
  category: string;
  readTime: string;
  author: CmsAuthor;
  publishedAt?: string | null;
  createdAt?: string | null;
}

/**
 * Full article detail from GET /api/v1/articles/{slug}.
 */
export interface CmsArticleDetail {
  id: number | string;
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  pillText?: string;
  date?: CmsDate;
  image: string;
  category: string;
  readTime: string;
  author: CmsAuthor;
  seo: CmsSeo;
  htmlContent?: string | null;
  content: CmsContentBlocks;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

/**
 * Pagination metadata from GET /api/v1/articles.
 */
export interface CmsPaginationMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

/**
 * Full API response envelope for GET /api/v1/articles.
 */
export interface CmsArticleListResponse {
  success: boolean;
  message?: string;
  data: CmsArticleListItem[];
  meta: CmsPaginationMeta;
}

/**
 * Full API response envelope for GET /api/v1/articles/{slug}.
 */
export interface CmsArticleDetailResponse {
  success: boolean;
  message?: string;
  data: CmsArticleDetail | null;
}

/**
 * Full API response envelope for GET /api/v1/articles-slugs.
 */
export interface CmsArticleSlugsResponse {
  success: boolean;
  data: string[];
}

/**
 * Query parameters for filtering CMS articles.
 */
export interface CmsArticleFilterParams {
  search?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

/**
 * Unified Article type extending standard ArticleItem.
 */
export type UnifiedArticle = ArticleItem & {
  isCms?: boolean;
  keywords?: string[];
  htmlContent?: string | null;
};

/**
 * Unified Detailed Article container.
 */
export interface UnifiedArticleDetailResult {
  article: UnifiedArticle;
  detailed?: DetailedBlogArticle | null;
  seo?: CmsSeo | null;
  isCms: boolean;
}
