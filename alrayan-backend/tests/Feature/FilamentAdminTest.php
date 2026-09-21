<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilamentAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_admin_login(): void
    {
        $response = $this->get('/admin');
        $response->assertRedirect('/admin/login');
    }

    public function test_admin_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/admin/login');
        $response->assertStatus(200);
    }

    public function test_authenticated_admin_can_access_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@hadiqat-alrayan.com',
        ]);

        $response = $this->actingAs($user)->get('/admin');
        $response->assertStatus(200);
    }

    public function test_authenticated_admin_can_access_article_and_user_pages(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/articles')->assertStatus(200);
        $this->actingAs($user)->get('/admin/articles/create')->assertStatus(200);
        $this->actingAs($user)->get('/admin/users')->assertStatus(200);
        $this->actingAs($user)->get('/admin/users/create')->assertStatus(200);
    }

    public function test_article_publish_and_unpublish_flow(): void
    {
        $article = Article::create([
            'title'        => 'مقال تجريبي لنظام إدارة المقالات',
            'slug'         => 'test-cms-article',
            'category'     => 'تنسيق حدائق',
            'status'       => 'draft',
            'published_at' => null,
            'keywords'     => ['تنسيق حدائق', 'عشب صناعي', 'شلالات بالرياض'],
            'introduction' => ['المقدمة 1', 'المقدمة 2'],
            'key_takeaways' => ['نقطة 1', 'نقطة 2', 'نقطة 3'],
            'sections'     => [
                ['id' => 'sec-1', 'numTitle' => '1. القسم الأول'],
                ['id' => 'sec-2', 'numTitle' => '2. القسم الثاني'],
            ],
            'comparison_table' => [
                'title'   => 'جدول مقارنة',
                'headers' => ['النوع', 'السعر'],
                'rows'    => [['طبيعي', 'متوسط'], ['صناعي', 'اقتصادي']],
            ],
            'fatal_mistakes' => ['خطأ 1', 'خطأ 2'],
            'faqs'           => [
                ['question' => 'سؤال 1؟', 'answer' => 'إجابة 1.'],
                ['question' => 'سؤال 2؟', 'answer' => 'إجابة 2.'],
            ],
            'conclusion'     => ['خاتمة 1', 'خاتمة 2'],
        ]);

        $this->assertEquals('draft', $article->status);
        $this->assertNull($article->published_at);

        // Publish
        $article->update([
            'status'       => 'published',
            'published_at' => now(),
        ]);
        $this->assertEquals('published', $article->fresh()->status);
        $this->assertNotNull($article->fresh()->published_at);

        // Unpublish
        $article->update([
            'status'       => 'draft',
            'published_at' => null,
        ]);
        $this->assertEquals('draft', $article->fresh()->status);
        $this->assertNull($article->fresh()->published_at);

        // Delete
        $article->delete();
        $this->assertEquals(0, Article::count());
    }
}
