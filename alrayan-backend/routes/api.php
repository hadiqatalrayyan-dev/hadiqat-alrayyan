<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'Al Rayan API is running',
        ]);
    });

    Route::get('/articles', [\App\Http\Controllers\Api\ArticleController::class, 'index']);
    Route::get('/articles-slugs', [\App\Http\Controllers\Api\ArticleController::class, 'slugs']);
    Route::get('/articles/{slug}', [\App\Http\Controllers\Api\ArticleController::class, 'show']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
