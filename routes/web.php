<?php

use App\Http\Controllers\BagianAkademikController;
use App\Http\Controllers\DekanController;
use App\Http\Controllers\DoswalController;
use App\Http\Controllers\KaprodiController;
use App\Http\Controllers\MhsController;
use App\Http\Controllers\PilihRoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/Mhs/dashboard', [MhsController::class, 'index'])->middleware(CheckRole::class.':Mahasiswa')->name('mhs.index');
    Route::get('/Dekan/dashboard', [DekanController::class, 'index'])->middleware(CheckRole::class.':Dekan')->name('dekan.index');
    Route::get('/BagianAkademik/dashboard', [BagianAkademikController::class, 'index'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.index');
    Route::get('/Doswal/dashboard', [DoswalController::class, 'index'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.index');
    Route::get('/Kaprodi/dashboard', [KaprodiController::class, 'index'])->middleware(CheckRole::class.':Ketua Prodi')->name('kaprodi.index');
    Route::get('/PilihRole', [PilihRoleController::class, 'index'])->name('pilihrole.index');
    Route::post('/PilihRole/choose', [PilihRoleController::class, 'choose'])->name('pilihrole.choose');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
