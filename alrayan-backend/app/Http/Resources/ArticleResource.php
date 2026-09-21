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
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = $this->resolveImageUrl($this->image, '/images/garden-costs-faq-banner.webp');
        $ogImageUrl = $this->resolveImageUrl($this->og_image, $imageUrl);
        $authorAvatar = $this->resolveImageUrl($this->author_avatar, '/images/rabea-shaban-profile.webp');

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
            'content'     => [
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
