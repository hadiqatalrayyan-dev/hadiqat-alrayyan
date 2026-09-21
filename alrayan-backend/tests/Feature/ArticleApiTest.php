<?php

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_published_articles_with_pagination(): void
    {
        Article::factory()->count(15)->create([
            'status' => 'published',
            'published_at' => now(),
        ]);

        Article::factory()->count(5)->create([
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/v1/articles');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'slug',
                        'title',
                        'excerpt',
                        'pillText',
                        'day',
                        'month',
                        'image',
                        'category',
                        'readTime',
                        'author' => [
                            'name',
                            'role',
                            'avatar',
                        ],
                        'publishedAt',
                        'createdAt',
                    ],
                ],
                'meta' => [
                    'currentPage',
                    'lastPage',
                    'perPage',
                    'total',
                ],
            ]);

        $response->assertJsonPath('meta.total', 15);
        $this->assertCount(12, $response->json('data')); // Default per_page is 12
    }

    public function test_can_filter_articles_by_search_query(): void
    {
        Article::factory()->create([
            'title' => 'دليل تصميم الشلالات المنزلية',
            'slug' => 'waterfall-guide',
            'category' => 'تصميم الشلالات والنوافير',
            'excerpt' => 'كل ما تريد معرفته عن الشلالات',
            'focus_keyword' => 'شلالات منزلية',
            'pill_text' => 'شلالات',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Article::factory()->create([
            'title' => 'أنواع النخيل في السعودية',
            'slug' => 'palm-trees-saudi',
            'category' => 'الأشجار والنباتات',
            'excerpt' => 'كل ما تريد معرفته عن النخيل',
            'focus_keyword' => 'نخيل واشنطوني',
            'pill_text' => 'نخيل',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->getJson('/api/v1/articles?search=الشلالات');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
        $this->assertEquals('waterfall-guide', $response->json('data.0.slug'));
    }

    public function test_can_filter_articles_by_category(): void
    {
        Article::factory()->create([
            'title' => 'شلالات حدائق',
            'category' => 'تصميم الشلالات والنوافير',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Article::factory()->create([
            'title' => 'عشب صناعي',
            'category' => 'العشب الصناعي والطبيعي',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->getJson('/api/v1/articles?category=' . urlencode('تصميم الشلالات والنوافير'));

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
        $this->assertEquals('تصميم الشلالات والنوافير', $response->json('data.0.category'));
    }

    public function test_can_get_single_published_article_with_full_structure(): void
    {
        $article = Article::factory()->create([
            'title' => 'مقال تجريبي متكامل',
            'slug' => 'test-complete-article',
            'status' => 'published',
            'published_at' => now(),
            'keywords' => ['تنسيق حدائق', 'لاندسكيب'],
            'introduction' => ['مقدمة المقال الترحيبية.'],
            'key_takeaways' => ['الفائدة الأولى', 'الفائدة الثانية'],
            'sections' => [
                [
                    'id' => 'section-1',
                    'numTitle' => '1. أولاً: التخطيط والتصميم',
                    'paragraphs' => ['هذا النص يشرح التخطيط.'],
                    'bullets' => ['نقطة أ', 'نقطة ب'],
                ],
            ],
            'faqs' => [
                [
                    'question' => 'ما هي التكلفة المتوقعة؟',
                    'answer' => 'تبدأ التكلفة من 5000 ريال.',
                ],
            ],
            'conclusion' => ['خاتمة المقال والتوصيات.'],
        ]);

        $response = $this->getJson('/api/v1/articles/test-complete-article');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'test-complete-article',
                    'title' => 'مقال تجريبي متكامل',
                    'seo' => [
                        'focusKeyword' => $article->focus_keyword,
                    ],
                    'content' => [
                        'introduction' => ['مقدمة المقال الترحيبية.'],
                        'keyTakeaways' => ['الفائدة الأولى', 'الفائدة الثانية'],
                        'sections' => [
                            [
                                'id' => 'section-1',
                                'numTitle' => '1. أولاً: التخطيط والتصميم',
                            ],
                        ],
                        'faqs' => [
                            [
                                'question' => 'ما هي التكلفة المتوقعة؟',
                                'answer' => 'تبدأ التكلفة من 5000 ريال.',
                            ],
                        ],
                        'conclusion' => ['خاتمة المقال والتوصيات.'],
                    ],
                ],
            ]);
    }

    public function test_cannot_access_draft_article_via_api(): void
    {
        Article::factory()->create([
            'slug' => 'draft-secret-article',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/v1/articles/draft-secret-article');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Article not found',
            ]);
    }

    public function test_can_get_all_published_slugs(): void
    {
        Article::factory()->create([
            'slug' => 'slug-1',
            'status' => 'published',
        ]);

        Article::factory()->create([
            'slug' => 'slug-2',
            'status' => 'published',
        ]);

        Article::factory()->create([
            'slug' => 'draft-slug',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/v1/articles-slugs');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => ['slug-1', 'slug-2'],
            ]);
    }

    public function test_article_can_store_and_return_rich_html_content(): void
    {
        $html = '<h2>عنوان فرعي</h2><p>فقرة تجريبية مكتوبة بالمحرر الذكي.</p><blockquote>اقتباس مهم</blockquote>';
        
        Article::factory()->create([
            'slug' => 'rich-article-test',
            'status' => 'published',
            'published_at' => now(),
            'content' => $html,
        ]);

        $response = $this->getJson('/api/v1/articles/rich-article-test');

        $response->assertStatus(200)
            ->assertJsonPath('data.htmlContent', $html)
            ->assertJsonPath('data.content.mainHtml', $html);
    }

    public function test_dangerous_html_is_sanitized_in_api_response(): void
    {
        $dirtyHtml = '<p>نص عادي</p><script>alert("xss")</script><iframe src="https://evil.com"></iframe><img src="/storage/test.png" onerror="alert(1)" />';

        Article::factory()->create([
            'slug' => 'sanitized-article-test',
            'status' => 'published',
            'published_at' => now(),
            'content' => $dirtyHtml,
        ]);

        $response = $this->getJson('/api/v1/articles/sanitized-article-test');

        $response->assertStatus(200);
        $html = $response->json('data.htmlContent');

        $this->assertStringNotContainsString('<script', $html);
        $this->assertStringNotContainsString('</script>', $html);
        $this->assertStringNotContainsString('<iframe', $html);
        $this->assertStringNotContainsString('onerror=', $html);
        $this->assertStringContainsString('<p>نص عادي</p>', $html);
    }

    public function test_relative_storage_images_are_converted_to_absolute_urls_in_rich_content(): void
    {
        $content = '<p>صورة داخل المقال:</p><img src="/storage/articles/content/photo.webp" alt="حديقة" />';

        Article::factory()->create([
            'slug' => 'image-url-test',
            'status' => 'published',
            'published_at' => now(),
            'content' => $content,
        ]);

        $response = $this->getJson('/api/v1/articles/image-url-test');

        $response->assertStatus(200);
        $html = $response->json('data.htmlContent');

        $this->assertStringContainsString('src="http', $html);
        $this->assertStringContainsString('/storage/articles/content/photo.webp"', $html);
    }
}
