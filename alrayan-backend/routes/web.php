<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return view('welcome');
});

// Direct Storage file server (guarantees uploaded images are served with CORS and caching even without symlinks)
Route::get('/storage/{path}', function (string $path) {
    $candidates = [
        storage_path('app/public/' . $path),
        storage_path('app/' . $path),
        storage_path('app/private/' . $path),
        public_path('storage/' . $path),
    ];

    $filePath = null;
    foreach ($candidates as $candidate) {
        if (File::exists($candidate) && !is_dir($candidate)) {
            $filePath = $candidate;
            break;
        }
    }

    if (!$filePath) {
        abort(404, 'File not found');
    }

    $mimeType = File::mimeType($filePath) ?: 'application/octet-stream';

    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, HEAD, OPTIONS',
        'Cache-Control' => 'public, max-age=31536000, immutable',
    ]);
})->where('path', '.*');
