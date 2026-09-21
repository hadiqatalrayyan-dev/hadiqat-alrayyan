<?php

namespace Tests\Feature;

use App\Filament\Resources\ArticleResource;
use App\Filament\Resources\UserResource;
use App\Filament\Resources\UserResource\Pages\CreateUser;
use App\Filament\Resources\UserResource\Pages\EditUser;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Livewire\Livewire;
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

    /*
    |--------------------------------------------------------------------------
    | ADMIN ROLE TESTS
    |--------------------------------------------------------------------------
    */

    public function test_admin_can_access_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get('/admin')->assertStatus(200);
    }

    public function test_admin_can_crud_articles(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get('/admin/articles')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/articles/create')->assertStatus(200);

        $article = Article::create([
            'title'        => 'مقال بواسطة أدمن',
            'slug'         => 'admin-article-test',
            'category'     => 'تنسيق حدائق',
            'status'       => 'draft',
        ]);

        $this->actingAs($admin)->get("/admin/articles/{$article->id}/edit")->assertStatus(200);

        $this->assertTrue(Gate::forUser($admin)->allows('viewAny', Article::class));
        $this->assertTrue(Gate::forUser($admin)->allows('create', Article::class));
        $this->assertTrue(Gate::forUser($admin)->allows('update', $article));
        $this->assertTrue(Gate::forUser($admin)->allows('delete', $article));
    }

    public function test_admin_can_see_and_access_users_management(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get('/admin/users')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/users/create')->assertStatus(200);

        $this->assertTrue(UserResource::canViewAny());
        $this->assertTrue(UserResource::shouldRegisterNavigation());
    }

    public function test_admin_can_create_user_and_it_defaults_to_user_role(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin);

        Livewire::test(CreateUser::class)
            ->fillForm([
                'name'     => 'مستخدم تجريبي جديد',
                'email'    => 'newuser@example.com',
                'password' => 'secret123456',
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $createdUser = User::where('email', 'newuser@example.com')->first();
        $this->assertNotNull($createdUser);
        $this->assertEquals(User::ROLE_USER, $createdUser->role);
        $this->assertTrue($createdUser->isUser());
        $this->assertFalse($createdUser->isAdmin());
    }

    public function test_admin_cannot_create_admin_from_user_create_form(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin);

        // Even if an attacker tries to inject role => ADMIN in create form payload
        Livewire::test(CreateUser::class)
            ->fillForm([
                'name'     => 'محاولة إنشاء أدمن',
                'email'    => 'fakeadmin@example.com',
                'password' => 'secret123456',
                'role'     => User::ROLE_ADMIN,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $user = User::where('email', 'fakeadmin@example.com')->first();
        $this->assertNotNull($user);
        // Mutator ensures it is always forced to USER
        $this->assertEquals(User::ROLE_USER, $user->role);
    }

    public function test_admin_can_update_user(): void
    {
        $admin = User::factory()->admin()->create();
        $regularUser = User::factory()->user()->create([
            'name'  => 'اسم قديم',
            'email' => 'old@example.com',
        ]);

        $this->actingAs($admin)->get("/admin/users/{$regularUser->id}/edit")->assertStatus(200);

        Livewire::test(EditUser::class, ['record' => $regularUser->getRouteKey()])
            ->fillForm([
                'name' => 'اسم معدل بواسطة الأدمن',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertEquals('اسم معدل بواسطة الأدمن', $regularUser->fresh()->name);
    }

    public function test_admin_can_delete_regular_user(): void
    {
        $admin = User::factory()->admin()->create();
        $regularUser = User::factory()->user()->create();

        $this->actingAs($admin);

        $this->assertTrue(Gate::forUser($admin)->allows('delete', $regularUser));
        $this->assertTrue(UserResource::canDelete($regularUser));

        $regularUser->delete();
        $this->assertNull(User::find($regularUser->id));
    }

    public function test_admin_cannot_delete_admin_user(): void
    {
        $admin1 = User::factory()->admin()->create(['email' => 'admin1@example.com']);
        $admin2 = User::factory()->admin()->create(['email' => 'admin2@example.com']);

        // 1. Gate Policy test: admin cannot delete another admin
        $this->assertFalse(Gate::forUser($admin1)->allows('delete', $admin2));
        $this->assertFalse(Gate::forUser($admin2)->allows('delete', $admin1));

        // 2. Resource canDelete test
        $this->actingAs($admin1);
        $this->assertFalse(UserResource::canDelete($admin2));

        // 3. Model level deletion protection test (throws exception)
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('لا يمكن حذف المستخدمين ذوي صلاحية مدير النظام (ADMIN).');
        $admin2->delete();
    }

    /*
    |--------------------------------------------------------------------------
    | USER ROLE TESTS
    |--------------------------------------------------------------------------
    */

    public function test_user_can_access_dashboard_and_articles(): void
    {
        $user = User::factory()->user()->create();

        $this->actingAs($user)->get('/admin')->assertStatus(200);
        $this->actingAs($user)->get('/admin/articles')->assertStatus(200);
        $this->actingAs($user)->get('/admin/articles/create')->assertStatus(200);
    }

    public function test_user_has_full_crud_and_publishing_on_articles(): void
    {
        $user = User::factory()->user()->create();

        $article = Article::create([
            'title'            => 'مقال شامل بواسطة محرر مستخدم',
            'slug'             => 'user-full-article',
            'category'         => 'عشب صناعي',
            'status'           => 'draft',
            'published_at'     => null,
            'content'          => '<h2>محتوى المقال كاملاً</h2><p>نص تجريبي</p>',
            'meta_title'       => 'عنوان سيو مخصص',
            'meta_description' => 'وصف سيو مخصص',
            'focus_keyword'    => 'عشب صناعي بالرياض',
            'keywords'         => ['عشب صناعي', 'تنسيق حدائق', 'ديكورات'],
            'author_name'      => 'محرر الموقع',
        ]);

        $this->actingAs($user)->get("/admin/articles/{$article->id}/edit")->assertStatus(200);

        // Policy checks
        $this->assertTrue(Gate::forUser($user)->allows('viewAny', Article::class));
        $this->assertTrue(Gate::forUser($user)->allows('create', Article::class));
        $this->assertTrue(Gate::forUser($user)->allows('update', $article));
        $this->assertTrue(Gate::forUser($user)->allows('delete', $article));

        // Publish flow
        $article->update([
            'status'       => 'published',
            'published_at' => now(),
        ]);
        $this->assertEquals('published', $article->fresh()->status);
        $this->assertNotNull($article->fresh()->published_at);

        // Unpublish flow
        $article->update([
            'status'       => 'draft',
            'published_at' => null,
        ]);
        $this->assertEquals('draft', $article->fresh()->status);

        // Delete article
        $article->delete();
        $this->assertNull(Article::find($article->id));
    }

    public function test_user_cannot_see_users_in_navigation(): void
    {
        $user = User::factory()->user()->create();

        $this->actingAs($user);
        $this->assertFalse(UserResource::shouldRegisterNavigation());
        $this->assertFalse(UserResource::canViewAny());
    }

    public function test_user_is_forbidden_from_users_routes(): void
    {
        $user = User::factory()->user()->create();
        $targetUser = User::factory()->user()->create();

        $this->actingAs($user);

        // Direct GET requests must return 403 Forbidden
        $this->get('/admin/users')->assertStatus(403);
        $this->get('/admin/users/create')->assertStatus(403);
        $this->get("/admin/users/{$targetUser->id}/edit")->assertStatus(403);
    }

    public function test_user_cannot_create_update_or_delete_users_via_policy(): void
    {
        $user = User::factory()->user()->create();
        $targetUser = User::factory()->user()->create();
        $targetAdmin = User::factory()->admin()->create();

        $this->assertFalse(Gate::forUser($user)->allows('viewAny', User::class));
        $this->assertFalse(Gate::forUser($user)->allows('view', $targetUser));
        $this->assertFalse(Gate::forUser($user)->allows('create', User::class));
        $this->assertFalse(Gate::forUser($user)->allows('update', $targetUser));
        $this->assertFalse(Gate::forUser($user)->allows('delete', $targetUser));
        $this->assertFalse(Gate::forUser($user)->allows('delete', $targetAdmin));
    }
}
