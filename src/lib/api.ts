import {
  CmsArticleDetail,
  CmsArticleDetailResponse,
  CmsArticleFilterParams,
  CmsArticleListItem,
  CmsArticleListResponse,
  CmsArticleSlugsResponse,
} from "@/types/article";

const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");

const DEFAULT_FETCH_TIMEOUT_MS = 5000;

/**
 * Robust fetch wrapper with timeout and error handling.
 */
async function safeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS
): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 404 or other HTTP error
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    // Graceful silent fallback for network errors, timeouts, or backend downtime
    return null;
  }
}

/**
 * Fetch paginated list of published articles from Laravel CMS API.
 */
export async function getCmsArticles(
  params: CmsArticleFilterParams = {}
): Promise<CmsArticleListItem[]> {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.per_page) searchParams.set("per_page", String(params.per_page));

  const qs = searchParams.toString();
  const endpoint = `/api/v1/articles${qs ? `?${qs}` : ""}`;

  const res = await safeFetch<CmsArticleListResponse>(endpoint);

  if (res && res.success && Array.isArray(res.data)) {
    return res.data;
  }

  return [];
}

/**
 * Fetch a single published article with full structured content from Laravel CMS API.
 */
export async function getCmsArticleBySlug(
  slug: string
): Promise<CmsArticleDetail | null> {
  if (!slug) return null;

  const endpoint = `/api/v1/articles/${encodeURIComponent(slug)}`;
  const res = await safeFetch<CmsArticleDetailResponse>(endpoint);

  if (res && res.success && res.data) {
    return res.data;
  }

  return null;
}

/**
 * Fetch all published article slugs from Laravel CMS API for SSG & Sitemap generation.
 */
export async function getCmsArticleSlugs(): Promise<string[]> {
  const endpoint = "/api/v1/articles-slugs";
  const res = await safeFetch<CmsArticleSlugsResponse>(endpoint);

  if (res && res.success && Array.isArray(res.data)) {
    return res.data;
  }

  return [];
}
