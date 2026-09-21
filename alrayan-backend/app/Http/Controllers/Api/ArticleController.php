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
        ]);
    }

    /**
     * Display the specified published article with its full structured content.
     */
    public function show(string $slug): JsonResponse
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

        return response()->json([
            'success' => true,
            'message' => 'Article retrieved successfully',
            'data'    => new ArticleResource($article),
        ]);
    }

    /**
     * Return all published article slugs for Next.js SSG and Sitemap.
     */
    public function slugs(): JsonResponse
    {
        $slugs = Article::where('status', 'published')
            ->orderByRaw('COALESCE(published_at, created_at) DESC')
            ->pluck('slug')
            ->values();

        return response()->json([
            'success' => true,
            'data'    => $slugs,
        ]);
    }
}
