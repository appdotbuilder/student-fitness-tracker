<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Student fitness tracker - main functionality on home page
Route::controller(StudentController::class)->group(function () {
    Route::get('/', 'index')->name('students.index');
    Route::post('/students', 'store')->name('students.store');
    Route::delete('/students/{student}', 'destroy')->name('students.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
