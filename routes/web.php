<?php

use App\Http\Controllers\WordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Initial route to the main site
Route::get('/solve-wordle', [WordController::class, 'start'])->middleware(['auth', 'verified'])->name('dashboard');

// Submitting the letters
//Route::get('/submit-words', [WordController::class, 'create']);

require __DIR__.'/settings.php';
