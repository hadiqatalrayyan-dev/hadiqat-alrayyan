<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Resolve image URL to full absolute storage URL or local static path.
     */
    protected function resolveImageUrl(?string $path, string $default): string
    {
        if (empty($path)) {
            return $default;
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }
        if (str_starts_with($path, '/images/')) {
            return $path;
        }
        $cleanPath = ltrim($path, '/');
        if (str_starts_with($cleanPath, 'storage/')) {
            $cleanPath = substr($cleanPath, 8);
        }
        return asset('storage/' . $cleanPath);
    }

    /**
     * Sanitize and normalize HTML content (absolute image URLs, strip dangerous scripts).
     */
    protected function normalizeHtmlContent(?string $html): ?string
    {
        if (empty($html)) {
            return null;
        }

        // 1. Strip <script> and dangerous tags
        $cleanHtml = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html);
        $cleanHtml = preg_replace('#<iframe(.*?)>(.*?)</iframe>#is', '', $cleanHtml);
        $cleanHtml = preg_replace('#\son\w+\s*=\s*(["\']).*?\1#i', '', $cleanHtml);
        $cleanHtml = preg_replace('#javascript:#i', '', $cleanHtml);

        // 2. Normalize relative image URLs to absolute storage URLs
        $cleanHtml = preg_replace_callback('/<img([^>]+)src=["\']([^"\']+)["\']/i', function ($matches) {
            $attrs = $matches[1];
            $src = $matches[2];

            if (!str_starts_with($src, 'http://') && !str_starts_with($src, 'https://')) {
                $cleanPath = ltrim($src, '/');
                if (str_starts_with($cleanPath, 'storage/')) {
                    $cleanPath = substr($cleanPath, 8);
                }
                $src = asset('storage/' . $cleanPath);
            }

            return "<img{$attrs}src=\"{$src}\"";
        }, $cleanHtml);

        return $cleanHtml;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = $this->resolveImageUrl($this->image, '/images/garden-costs-faq-banner.webp');
        $ogImageUrl = $this->resolveImageUrl($this->og_image, $imageUrl);
        $authorAvatar = $this->resolveImageUrl($this->author_avatar, '/images/rabea-shaban-profile.webp');
        $htmlContent = $this->normalizeHtmlContent($this->content);

        return [
            'id'          => $this->id,
            'slug'        => $this->slug,
            'title'       => $this->title,
            'subtitle'    => $this->subtitle,
            'excerpt'     => $this->excerpt ?? '',
            'pillText'    => $this->pill_text ?? 'معلومات تهمك',
            'date'        => [
                'day'   => $this->day ?: ($this->published_at ? $this->published_at->format('d') : ($this->created_at ? $this->created_at->format('d') : '15')),
                'month' => $this->month ?: 'سبتمبر',
            ],
            'image'       => $imageUrl,
            'category'    => $this->category ?? 'معلومات عن تنسيق الحدائق',
            'readTime'    => $this->read_time ?? '8 دقائق',
            'author'      => [
                'name'   => $this->author_name ?? 'مؤسسة حدائق الريان',
                'role'   => $this->author_role ?? 'مهندس لاندسكيب وتصميم حدائق',
                'avatar' => $authorAvatar,
            ],
            'seo'         => [
                'metaTitle'       => $this->meta_title ?: $this->title,
                'metaDescription' => $this->meta_description ?: ($this->subtitle ?: $this->excerpt),
                'focusKeyword'    => $this->focus_keyword,
                'keywords'        => $this->keywords ?: [],
                'canonicalUrl'    => $this->canonical_url ?: "https://hadiqat-alrayan.com/blog/{$this->slug}/",
                'ogImage'         => $ogImageUrl,
            ],
            'htmlContent' => $htmlContent,
            'content'     => [
                'mainHtml'        => $htmlContent,
                'tableOfContents' => $this->table_of_contents ?: [],
                'introduction'    => $this->introduction ?: [],
                'keyTakeaways'    => $this->key_takeaways ?: [],
                'sections'        => $this->sections ?: [],
                'comparisonTable' => $this->comparison_table,
                'fatalMistakes'   => $this->fatal_mistakes ?: [],
                'faqs'            => $this->faqs ?: [],
                'conclusion'      => $this->conclusion ?: [],
                'summaryBox'      => $this->summary_box,
                'fullContent'     => $this->full_content,
            ],
            'publishedAt' => $this->published_at?->toIso8601String(),
            'createdAt'   => $this->created_at?->toIso8601String(),
            'updatedAt'   => $this->updated_at?->toIso8601String(),
        ];
    }
}
