<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = $this->image;
        if ($imageUrl && !str_starts_with($imageUrl, 'http') && !str_starts_with($imageUrl, '/')) {
            $imageUrl = '/storage/' . $imageUrl;
        }

        return [
            'id'          => $this->id,
            'slug'        => $this->slug,
            'title'       => $this->title,
            'excerpt'     => $this->excerpt ?? '',
            'pillText'    => $this->pill_text ?? 'معلومات تهمك',
            'day'         => $this->day ?: ($this->published_at ? $this->published_at->format('d') : ($this->created_at ? $this->created_at->format('d') : '15')),
            'month'       => $this->month ?: 'سبتمبر',
            'image'       => $imageUrl ?: '/images/garden-costs-faq-banner.webp',
            'category'    => $this->category ?? 'معلومات عن تنسيق الحدائق',
            'readTime'    => $this->read_time ?? '8 دقائق',
            'author'      => [
                'name'   => $this->author_name ?? 'مؤسسة حدائق الريان',
                'role'   => $this->author_role ?? 'مهندس لاندسكيب',
                'avatar' => $this->author_avatar ?? '/images/rabea-shaban-profile.webp',
            ],
            'publishedAt' => $this->published_at?->toIso8601String(),
            'createdAt'   => $this->created_at?->toIso8601String(),
        ];
    }
}
