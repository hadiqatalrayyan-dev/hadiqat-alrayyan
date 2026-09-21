import {
  CmsArticleDetail,
  CmsArticleDetailResponse,
  CmsArticleFilterParams,
  CmsArticleListItem,
  CmsArticleListResponse,
  CmsArticleSlugsResponse,
  CmsSitemapEntry,
} from "@/types/article";

function resolveApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  // If in production or running build without local backend, default to production API
  if (process.env.NODE_ENV === "production" || !envUrl || envUrl.includes("127.0.0.1") || envUrl.includes("localhost")) {
    return "https://api.hadiqat-alrayan.com";
  }
  return envUrl.replace(/\/+$/, "");
}

const API_BASE_URL = resolveApiBaseUrl();

const DEFAULT_FETCH_TIMEOUT_MS = 6000;

// High-speed in-memory cache for client-side navigation
const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute client cache

/**
 * Robust fetch wrapper with timeout, Next.js caching, and in-memory cache.
 */
async function safeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS
): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Check client memory cache for GET requests
  const isGet = !options.method || options.method === "GET";
  if (isGet && typeof window !== "undefined") {
    const cached = memoryCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data as T;
    }
  }

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
      // Next.js data cache for static/dynamic rendering
      next: { revalidate: 60 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 404 or other HTTP error
      return null;
    }

    const data: T = await response.json();

    // Cache successful GET response
    if (isGet && typeof window !== "undefined" && data) {
      memoryCache.set(url, { data, timestamp: Date.now() });
    }

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
 * Fetch all published article slugs from Laravel CMS API for SSG.
 */
export async function getCmsArticleSlugs(): Promise<string[]> {
  const endpoint = "/api/v1/articles-slugs";
  const res = await safeFetch<CmsArticleSlugsResponse>(endpoint);

  if (res && res.success && Array.isArray(res.data)) {
    return res.data;
  }

  return [];
}

/**
 * Fetch all published article sitemap entries with exact last_modified dates.
 */
export async function getCmsSitemapEntries(): Promise<CmsSitemapEntry[]> {
  const endpoint = "/api/v1/articles-slugs";
  const res = await safeFetch<CmsArticleSlugsResponse>(endpoint);

  if (res && res.success) {
    if (Array.isArray(res.entries) && res.entries.length > 0) {
      return res.entries;
    }
    if (Array.isArray(res.data)) {
      return res.data.map((slug) => ({ slug, last_modified: null }));
    }
  }

  return [];
}
