<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'excerpt',
        'pill_text',
        'day',
        'month',
        'image',
        'category',
        'read_time',
        'author_name',
        'author_role',
        'author_avatar',
        'meta_title',
        'meta_description',
        'focus_keyword',
        'keywords',
        'canonical_url',
        'og_image',
        'table_of_contents',
        'introduction',
        'key_takeaways',
        'sections',
        'comparison_table',
        'fatal_mistakes',
        'faqs',
        'conclusion',
        'summary_box',
        'full_content',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'keywords'          => 'array',
            'table_of_contents' => 'array',
            'introduction'      => 'array',
            'key_takeaways'     => 'array',
            'sections'          => 'array',
            'comparison_table'  => 'array',
            'fatal_mistakes'    => 'array',
            'faqs'              => 'array',
            'conclusion'        => 'array',
            'published_at'      => 'datetime',
        ];
    }
}
