<?php

namespace App\Observers;

use App\Models\Article;
use App\Services\BuildWebhookService;

class ArticleObserver
{
    public function __construct(protected BuildWebhookService $webhookService)
    {
    }

    /**
     * Handle the Article "created" event.
     */
    public function created(Article $article): void
    {
        if ($article->status === 'published') {
            $this->webhookService->trigger('article.published', $article);
        }
    }

    /**
     * Handle the Article "updated" event.
     */
    public function updated(Article $article): void
    {
        $statusChanged = $article->wasChanged('status');
        $oldStatus = $article->getOriginal('status');
        $currentStatus = $article->status;

        if ($statusChanged) {
            if ($currentStatus === 'published') {
                $this->webhookService->trigger('article.published', $article);
            } elseif ($oldStatus === 'published' && $currentStatus !== 'published') {
                $this->webhookService->trigger('article.unpublished', $article);
            }
        } elseif ($currentStatus === 'published') {
            $this->webhookService->trigger('article.updated', $article);
        }
    }

    /**
     * Handle the Article "deleted" event.
     */
    public function deleted(Article $article): void
    {
        if ($article->status === 'published') {
            $this->webhookService->trigger('article.deleted', $article);
        }
    }
}
