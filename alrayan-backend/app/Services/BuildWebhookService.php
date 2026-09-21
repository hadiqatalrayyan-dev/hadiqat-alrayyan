<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class BuildWebhookService
{
    /**
     * Dispatch a build webhook trigger for published articles.
     */
    public function trigger(string $event, Article $article): bool
    {
        $enabled = config('services.build_webhook.enabled', false);
        $url = config('services.build_webhook.url');

        if (!$enabled || empty($url)) {
            Log::info("Build webhook skipped (disabled or no URL configured)", [
                'event' => $event,
                'article_id' => $article->id,
                'slug' => $article->slug,
            ]);
            return false;
        }

        $secret = config('services.build_webhook.secret');
        $timeout = config('services.build_webhook.timeout', 10);

        $payload = [
            'event'     => $event,
            'timestamp' => now()->toIso8601String(),
            'article'   => [
                'id'           => $article->id,
                'slug'         => $article->slug,
                'title'        => $article->title,
                'status'       => $article->status,
                'published_at' => $article->published_at?->toIso8601String(),
            ],
        ];

        try {
            $headers = [
                'Content-Type' => 'application/json',
                'User-Agent'   => 'AlRayan-CMS-Webhook/1.0',
            ];

            if (!empty($secret)) {
                $headers['X-Webhook-Secret'] = $secret;
                $headers['Authorization'] = "Bearer {$secret}";
            }

            $response = Http::withHeaders($headers)
                ->timeout($timeout)
                ->post($url, $payload);

            if ($response->successful()) {
                Log::info("Build webhook dispatched successfully", [
                    'event'       => $event,
                    'article_id'  => $article->id,
                    'slug'        => $article->slug,
                    'status_code' => $response->status(),
                ]);
                return true;
            }

            Log::warning("Build webhook returned non-200 status", [
                'event'       => $event,
                'status_code' => $response->status(),
                'response'    => $response->body(),
            ]);
            return false;
        } catch (Throwable $e) {
            Log::error("Failed to dispatch build webhook: " . $e->getMessage(), [
                'event'      => $event,
                'article_id' => $article->id,
                'slug'       => $article->slug,
            ]);
            return false;
        }
    }
}
