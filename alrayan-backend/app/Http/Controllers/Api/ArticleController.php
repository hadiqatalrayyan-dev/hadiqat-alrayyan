<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a paginated listing of published articles with optional search and category filters.
     * Includes HTTP Cache headers for fast indexing and CDN caching.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Article::where('status', 'published');

        // Search filter
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('pill_text', 'like', "%{$search}%")
                  ->orWhere('focus_keyword', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $category = trim($request->input('category'));
            $query->where('category', $category);
        }

        // Order by published_at DESC (fallback to created_at DESC)
        $query->orderByRaw('COALESCE(published_at, created_at) DESC');

        $perPage = max(1, min(100, (int) $request->input('per_page', 12)));
        $paginated = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Articles retrieved successfully',
            'data'    => ArticleListResource::collection($paginated->items()),
            'meta'    => [
                'currentPage' => $paginated->currentPage(),
                'lastPage'    => $paginated->lastPage(),
                'perPage'     => $paginated->perPage(),
                'total'       => $paginated->total(),
            ],
        ])
        ->header('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
    }

    /**
     * Display the specified published article with its full structured content.
     * Supports ETag, Last-Modified and CDN edge caching.
     */
    public function show(Request $request, string $slug): JsonResponse
    {
        $decodedSlug = urldecode($slug);

        $article = Article::where('status', 'published')
            ->where(function ($q) use ($slug, $decodedSlug) {
                $q->where('slug', $slug)
                  ->orWhere('slug', $decodedSlug);
            })
            ->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found',
                'data'    => null,
            ], 404);
        }

        $etag = md5($article->id . '-' . ($article->updated_at?->timestamp ?? 0));
        $lastModified = ($article->updated_at ?? $article->published_at ?? $article->created_at);

        if ($request->header('If-None-Match') === $etag) {
            return response()->json(null, 304);
        }

        return response()->json([
            'success' => true,
            'message' => 'Article retrieved successfully',
            'data'    => new ArticleResource($article),
        ])
        ->header('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400')
        ->header('ETag', $etag)
        ->header('Last-Modified', $lastModified ? $lastModified->toRfc7231String() : now()->toRfc7231String());
    }

    /**
     * Return all published article slugs and sitemap metadata for Next.js SSG & Sitemap generation.
     */
    public function slugs(): JsonResponse
    {
        $articles = Article::where('status', 'published')
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->select(['id', 'slug', 'updated_at', 'published_at', 'created_at'])
            ->get();

        $slugs = $articles->pluck('slug')->values();

        return response()->json([
            'success' => true,
            'data'    => $slugs,
            'entries' => $articles->map(fn ($a) => [
                'slug'          => $a->slug,
                'last_modified' => ($a->updated_at ?? $a->published_at ?? $a->created_at)?->toIso8601String(),
            ]),
        ])
        ->header('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
    }
}
