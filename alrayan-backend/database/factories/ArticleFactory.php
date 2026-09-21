<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake('ar_SA')->sentence(5);
        $slug = Str::slug($title) . '-' . fake()->unique()->numberBetween(100, 9999);

        return [
            'slug' => $slug,
            'title' => $title,
            'subtitle' => fake('ar_SA')->sentence(8),
            'excerpt' => fake('ar_SA')->paragraph(),
            'pill_text' => 'معلومات تهمك',
            'day' => (string) fake()->numberBetween(1, 28),
            'month' => 'سبتمبر',
            'image' => '/images/garden-costs-faq-banner.webp',
            'category' => fake()->randomElement([
                'معلومات عن تنسيق الحدائق',
                'تصميم الشلالات والنوافير',
                'العشب الصناعي والطبيعي',
                'المظلات والبرجولات',
                'شبكات الري والإنارة',
            ]),
            'read_time' => '8 دقائق',
            'author_name' => 'مؤسسة حدائق الريان',
            'author_role' => 'مهندس لاندسكيب وتصميم حدائق',
            'author_avatar' => '/images/rabea-shaban-profile.webp',
            'meta_title' => $title . ' | مؤسسة حدائق الريان',
            'meta_description' => fake('ar_SA')->sentence(12),
            'focus_keyword' => 'تنسيق حدائق بالرياض',
            'keywords' => ['تنسيق حدائق', 'لاندسكيب بالرياض'],
            'canonical_url' => "https://hadiqat-alrayan.com/blog/{$slug}/",
            'og_image' => '/images/og-image.webp',
            'status' => 'published',
            'published_at' => now(),
            'table_of_contents' => [
                ['id' => 'intro', 'title' => 'المقدمة'],
                ['id' => 'sec-1', 'title' => 'التفاصيل الرئيسية'],
            ],
            'introduction' => [
                'مقدمة المقال التوضيحية حول تصميم وتنسيق الحدائق.',
            ],
            'key_takeaways' => [
                'نقطة جوهرية أولى',
                'نقطة جوهرية ثانية',
            ],
            'sections' => [
                [
                    'id' => 'sec-1',
                    'numTitle' => '1. أولاً: التخطيط المسبق',
                    'paragraphs' => ['فقرة توضيحية حول الخطوات.'],
                    'bullets' => ['خطوة 1', 'خطوة 2'],
                ],
            ],
            'comparison_table' => null,
            'fatal_mistakes' => [
                'الخطأ الشائع الأول',
            ],
            'faqs' => [
                [
                    'question' => 'كم تبلغ تكلفة الخدمة؟',
                    'answer' => 'تختلف التكلفة بحسب المساحة والمواصفات المطلوبة.',
                ],
            ],
            'conclusion' => [
                'خاتمة المقال وخلاصة النصائح.',
            ],
        ];
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => now(),
        ]);
    }
}
