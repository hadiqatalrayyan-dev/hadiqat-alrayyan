<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Article;
use Tests\TestCase;

class ArticleModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_article_with_json_casts_and_clean_up(): void
    {
        $initialCount = Article::count();

        $article = Article::create([
            'title'             => 'دليل تصميم الحدائق المنزلية بالرياض 2026',
            'slug'              => 'home-garden-landscaping-riyadh-guide-2026',
            'subtitle'          => 'دليل شامل لاختيار العشب وشبكات الري',
            'excerpt'           => 'تعرف على أفضل النصائح لتنسيق حديقة منزلك بالرياض',
            'pill_text'         => 'دليل إرشادي 2026',
            'day'               => '15',
            'month'             => 'سبتمبر',
            'image'             => '/images/garden-design-ideas-banner.webp',
            'category'          => 'دليل الأسعار والتكاليف',
            'read_time'         => '10 دقائق',
            'author_name'       => 'م. إبراهيم الدوسري',
            'author_role'       => 'مهندس لاندسكيب',
            'author_avatar'     => '/images/rabea-shaban-profile.webp',
            'meta_title'        => 'دليل تصميم الحدائق المنزلية بالرياض 2026',
            'meta_description'  => 'دليلك الشامل لتنسيق وتصميم حدائق المنازل بالرياض',
            'focus_keyword'     => 'تنسيق حدائق بالرياض',
            'keywords'          => ['تنسيق حدائق', 'عشب صناعي', 'شلالات منزلية'],
            'canonical_url'     => 'https://hadiqat-alrayan.com/blog/home-garden-landscaping-riyadh-guide-2026/',
            'og_image'          => '/images/garden-design-ideas-banner.webp',
            'table_of_contents' => [['id' => 'intro', 'title' => 'مقدمة']],
            'introduction'      => ['فقرة المقدمة الأولى'],
            'key_takeaways'     => ['ضمان 7 سنوات', 'معاينة مجانية'],
            'sections'          => [
                [
                    'id'         => 'sec-1',
                    'numTitle'   => '1. مرحلة التخطيط والتصميم',
                    'paragraphs' => ['تفاصيل التخطيط...'],
                    'bullets'    => ['رفع المقاسات بالليزر']
                ]
            ],
            'comparison_table'  => [
                'title'   => 'مقارنة العشب الطبيعي والصناعي',
                'headers' => ['النوع', 'الميزات', 'التكلفة'],
                'rows'    => [['صناعي', 'لا يحتاج ري', 'اقتصادي']]
            ],
            'fatal_mistakes'    => ['احذر من إهمال ميول الأرضيات'],
            'faqs'              => [
                ['question' => 'هل المعاينة مجانية؟', 'answer' => 'نعم المعاينة مجانية بالكامل.']
            ],
            'conclusion'        => ['الخلاصة والتوصيات الهندسية'],
            'summary_box'       => 'احجز معاينتك المجانية الآن عبر الاتصال بنا',
            'full_content'      => null,
            'status'            => 'draft',
            'published_at'      => null,
        ]);

        $this->assertNotNull($article->id);
        $this->assertEquals('draft', $article->status);
        $this->assertEquals($initialCount + 1, Article::count());

        // Test JSON casts are PHP arrays
        $fresh = $article->fresh();
        $this->assertIsArray($fresh->keywords);
        $this->assertCount(3, $fresh->keywords);
        $this->assertIsArray($fresh->faqs);
        $this->assertEquals('هل المعاينة مجانية؟', $fresh->faqs[0]['question']);
        $this->assertIsArray($fresh->key_takeaways);
        $this->assertIsArray($fresh->sections);
        $this->assertIsArray($fresh->comparison_table);
        $this->assertIsArray($fresh->fatal_mistakes);
        $this->assertIsArray($fresh->table_of_contents);
        $this->assertIsArray($fresh->introduction);
        $this->assertIsArray($fresh->conclusion);

        // Cleanup test article
        $article->delete();
        $this->assertEquals($initialCount, Article::count());
    }

    public function test_unique_slug_constraint(): void
    {
        $article1 = Article::create([
            'title' => 'مقال أول',
            'slug'  => 'unique-test-slug',
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Article::create([
            'title' => 'مقال مكرر الـ Slug',
            'slug'  => 'unique-test-slug',
        ]);
    }
}
