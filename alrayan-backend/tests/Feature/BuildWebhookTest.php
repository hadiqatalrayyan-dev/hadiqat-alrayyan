<?php

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class BuildWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Config::set('services.build_webhook.enabled', true);
        Config::set('services.build_webhook.url', 'https://api.vercel.com/v1/integrations/deploy/test-hook');
        Config::set('services.build_webhook.secret', 'test-secret-key');
    }

    public function test_creating_draft_article_does_not_trigger_webhook(): void
    {
        Http::fake();

        Article::factory()->draft()->create([
            'title' => 'مسودة مقال جديد',
            'slug' => 'draft-article-test',
        ]);

        Http::assertNothingSent();
    }

    public function test_creating_published_article_triggers_webhook(): void
    {
        Http::fake([
            '*' => Http::response(['job' => ['id' => '12345']], 200),
        ]);

        $article = Article::factory()->published()->create([
            'title' => 'مقال منشور فوري',
            'slug' => 'published-article-test',
        ]);

        Http::assertSent(function ($request) use ($article) {
            return $request->url() === 'https://api.vercel.com/v1/integrations/deploy/test-hook'
                && $request->header('X-Webhook-Secret')[0] === 'test-secret-key'
                && $request['event'] === 'article.published'
                && $request['article']['slug'] === 'published-article-test';
        });
    }

    public function test_transitioning_draft_to_published_triggers_webhook(): void
    {
        Http::fake([
            '*' => Http::response(['status' => 'success'], 200),
        ]);

        $article = Article::factory()->draft()->create([
            'title' => 'مسودة تنتظر الموافقة',
            'slug' => 'draft-to-publish-slug',
        ]);

        Http::assertNothingSent();

        // Publish the article
        $article->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        Http::assertSent(function ($request) {
            return $request['event'] === 'article.published'
                && $request['article']['slug'] === 'draft-to-publish-slug';
        });
    }

    public function test_updating_published_article_triggers_webhook(): void
    {
        Http::fake([
            '*' => Http::response(['status' => 'success'], 200),
        ]);

        $article = Article::factory()->published()->create([
            'title' => 'مقال منشور قديم',
            'slug' => 'old-published-slug',
        ]);

        Http::assertSentCount(1); // 1 for creation

        $article->update([
            'title' => 'مقال منشور معدل بالكامل',
        ]);

        Http::assertSentCount(2); // 2nd for update
    }

    public function test_updating_draft_article_does_not_trigger_webhook(): void
    {
        Http::fake();

        $article = Article::factory()->draft()->create([
            'title' => 'مسودة أولية',
            'slug' => 'draft-staying-draft',
        ]);

        $article->update([
            'title' => 'تعديل المسودة الأولية',
            'excerpt' => 'محتوى تجريبي معدل للمسودة',
        ]);

        Http::assertNothingSent();
    }

    public function test_deleting_published_article_triggers_webhook(): void
    {
        Http::fake([
            '*' => Http::response(['status' => 'success'], 200),
        ]);

        $article = Article::factory()->published()->create([
            'title' => 'مقال سيتم حذفه',
            'slug' => 'article-to-delete',
        ]);

        $article->delete();

        Http::assertSent(function ($request) {
            return $request['event'] === 'article.deleted'
                && $request['article']['slug'] === 'article-to-delete';
        });
    }

    public function test_api_resource_resolves_uploaded_storage_image_to_absolute_url(): void
    {
        $article = Article::factory()->published()->create([
            'title' => 'مقال بصورة مرفوعة',
            'slug' => 'article-with-uploaded-media',
            'image' => 'articles/test-featured-landscape.webp',
            'og_image' => 'articles/og/test-og.webp',
            'author_avatar' => 'authors/engineer-avatar.webp',
        ]);

        $response = $this->getJson('/api/v1/articles/article-with-uploaded-media');

        $response->assertStatus(200);

        $imageUrl = $response->json('data.image');
        $ogImageUrl = $response->json('data.seo.ogImage');
        $authorAvatar = $response->json('data.author.avatar');

        $this->assertStringContainsString('/storage/articles/test-featured-landscape.webp', $imageUrl);
        $this->assertStringContainsString('/storage/articles/og/test-og.webp', $ogImageUrl);
        $this->assertStringContainsString('/storage/authors/engineer-avatar.webp', $authorAvatar);
        $this->assertTrue(str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://'));
    }
}
