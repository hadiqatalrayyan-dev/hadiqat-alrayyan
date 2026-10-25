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

const DEFAULT_FETCH_TIMEOUT_MS = 15000; // 15 seconds to ensure reliable fetching on all networks

// High-speed in-memory cache for client-side navigation
const memoryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute client cache

// In-flight request deduplication map to prevent race conditions & duplicate requests
const inFlightRequests = new Map<string, Promise<unknown>>();

export type FetchStatusResult<T> =
  | { status: "success"; data: T }
  | { status: "not_found" }
  | { status: "error"; error: string; statusCode?: number };

/**
 * Enhanced fetch wrapper with request deduplication, resilient timeout, auto-retry, and explicit error status tracking.
 */
export async function fetchWithStatus<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS
): Promise<FetchStatusResult<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const isGet = !options.method || options.method === "GET";

  // Check client memory cache for GET requests
  if (isGet && typeof window !== "undefined") {
    const cached = memoryCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return { status: "success", data: cached.data as T };
    }
  }

  // Deduplicate identical in-flight GET requests
  if (isGet && inFlightRequests.has(url)) {
    return inFlightRequests.get(url) as Promise<FetchStatusResult<T>>;
  }

  const fetchPromise = (async (): Promise<FetchStatusResult<T>> => {
    let attempt = 0;
    while (attempt < 2) {
      attempt++;
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
          next: { revalidate: 60 },
        });

        clearTimeout(timeoutId);

        if (response.status === 404) {
          return { status: "not_found" };
        }

        if (!response.ok) {
          if (attempt < 2 && response.status >= 500) {
            await new Promise((r) => setTimeout(r, 600));
            continue;
          }
          return {
            status: "error",
            statusCode: response.status,
            error: `Server responded with HTTP ${response.status}`,
          };
        }

        const data: T = await response.json();

        if (isGet && typeof window !== "undefined" && data) {
          memoryCache.set(url, { data, timestamp: Date.now() });
        }

        return { status: "success", data };
      } catch (error: unknown) {
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 600));
          continue;
        }
        const isAbort = error instanceof Error && error.name === "AbortError";
        return {
          status: "error",
          error: isAbort ? "Request timed out" : (error instanceof Error ? error.message : "Network failure"),
        };
      } finally {
        if (isGet) {
          inFlightRequests.delete(url);
        }
      }
    }
    return { status: "error", error: "Request failed after retry" };
  })();

  if (isGet) {
    inFlightRequests.set(url, fetchPromise);
  }

  return fetchPromise;
}

/**
 * Robust fetch wrapper with timeout, Next.js caching, and in-memory cache.
 */
async function safeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS
): Promise<T | null> {
  const result = await fetchWithStatus<T>(endpoint, options, timeoutMs);
  return result.status === "success" ? result.data : null;
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

export type CmsArticleDetailResult =
  | { status: "success"; data: CmsArticleDetail }
  | { status: "not_found" }
  | { status: "error"; error: string };

/**
 * Fetch a single published article with explicit result status (success, not_found, or error).
 * Prevents treating network/500 errors as 404s.
 */
export async function getCmsArticleDetailResult(
  slug: string
): Promise<CmsArticleDetailResult> {
  if (!slug) return { status: "not_found" };

  const endpoint = `/api/v1/articles/${encodeURIComponent(slug)}`;
  const res = await fetchWithStatus<CmsArticleDetailResponse>(endpoint);

  if (res.status === "success") {
    if (res.data && res.data.success && res.data.data) {
      return { status: "success", data: res.data.data };
    }
    return { status: "not_found" };
  }

  if (res.status === "not_found") {
    return { status: "not_found" };
  }

  return { status: "error", error: res.error };
}

/**
 * Fetch a single published article with full structured content from Laravel CMS API.
 */
export async function getCmsArticleBySlug(
  slug: string
): Promise<CmsArticleDetail | null> {
  const result = await getCmsArticleDetailResult(slug);
  return result.status === "success" ? result.data : null;
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
