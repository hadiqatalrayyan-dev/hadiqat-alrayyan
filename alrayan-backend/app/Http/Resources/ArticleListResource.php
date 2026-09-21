<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleListResource extends JsonResource
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
        $authorAvatar = $this->resolveImageUrl($this->author_avatar, '/images/rabea-shaban-profile.webp');

        return [
            'id'          => $this->id,
            'slug'        => $this->slug,
            'title'       => $this->title,
            'excerpt'     => $this->excerpt ?? '',
            'pillText'    => $this->pill_text ?? 'معلومات تهمك',
            'day'         => $this->day ?: ($this->published_at ? $this->published_at->format('d') : ($this->created_at ? $this->created_at->format('d') : '15')),
            'month'       => $this->month ?: 'سبتمبر',
            'image'       => $imageUrl,
            'category'    => $this->category ?? 'معلومات عن تنسيق الحدائق',
            'readTime'    => $this->read_time ?? '8 دقائق',
            'author'      => [
                'name'   => $this->author_name ?? 'مؤسسة حدائق الريان',
                'role'   => $this->author_role ?? 'مهندس لاندسكيب',
                'avatar' => $authorAvatar,
            ],
            'publishedAt' => $this->published_at?->toIso8601String(),
            'createdAt'   => $this->created_at?->toIso8601String(),
        ];
    }
}
