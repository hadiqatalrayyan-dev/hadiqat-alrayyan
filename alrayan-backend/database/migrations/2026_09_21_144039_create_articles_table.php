<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            // Basic Information
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('subtitle')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('pill_text')->nullable();
            $table->string('day')->nullable();
            $table->string('month')->nullable();
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->string('read_time')->nullable();

            // Author
            $table->string('author_name')->nullable();
            $table->string('author_role')->nullable();
            $table->string('author_avatar')->nullable();

            // SEO Fields
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('focus_keyword')->nullable();
            $table->json('keywords')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('og_image')->nullable();

            // Structured Content
            $table->json('table_of_contents')->nullable();
            $table->json('introduction')->nullable();
            $table->json('key_takeaways')->nullable();
            $table->json('sections')->nullable();
            $table->json('comparison_table')->nullable();
            $table->json('fatal_mistakes')->nullable();
            $table->json('faqs')->nullable();
            $table->json('conclusion')->nullable();
            $table->text('summary_box')->nullable();

            // Full Content Fallback
            $table->longText('full_content')->nullable();

            // Publishing
            $table->enum('status', ['draft', 'published'])->default('draft')->index();
            $table->timestamp('published_at')->nullable()->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
