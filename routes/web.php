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
    Route::get('/Dekan/KelolaRuang', [DekanController::class, 'kelolaruang'])->middleware(CheckRole::class.':Dekan')->name('dekan.kelolaruang');
    Route::get('/Dekan/JadwalKuliah', [DekanController::class, 'jadwalKuliah'])->middleware(CheckRole::class.':Dekan')->name('dekan.jadwalkuliah');
    Route::post('/Dekan/{id}/setujui', [DekanController::class, 'setujui'])->name('dekan.setujui');
    Route::get('/BagianAkademik/dashboard', [BagianAkademikController::class, 'index'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.index');
    Route::get('/Doswal/dashboard', [DoswalController::class, 'index'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.index');
    Route::get('/Doswal/mahasiswaPerwalian', [DoswalController::class, 'mahasiswaPerwalian'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.mahasiswaPerwalian');
    Route::get('/Doswal/verifikasiIRS', [DoswalController::class, 'verifikasiIRS'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.verifikasiIRS');
    Route::get('/Doswal/statusPerkembangan', [DoswalController::class, 'statusPerkembangan'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.statusPerkembangan');
    Route::get('/Kaprodi/dashboard', [KaprodiController::class, 'index'])->middleware(CheckRole::class.':Ketua Prodi')->name('kaprodi.index');
    Route::get('/Kaprodi/jadwalKuliah', [KaprodiController::class, 'jadwalKuliah'])->middleware(CheckRole::class.':Kaprodi')->name('kaprodi.jadwalKuliah');
    Route::get('/Kaprodi/jadwalDetail/{id}', [KaprodiController::class, 'jadwalDetail'])->middleware(CheckRole::class.':Kaprodi')->name('kaprodi.jadwalDetail');
    Route::get('/Kaprodi/mahasiswa', [KaprodiController::class, 'mahasiswa'])->middleware(CheckRole::class.':Kaprodi')->name('kaprodi.mahasiswa');
    Route::get('/Kaprodi/monitoring', [KaprodiController::class, 'monitoring'])->middleware(CheckRole::class.':Kaprodi')->name('kaprodi.monitoring');
    Route::post('/kaprodi/update-status-irs/{studentId}', [KaprodiController::class, 'updateStatusIRS']);
    Route::get('/PilihRole', [PilihRoleController::class, 'index'])->name('pilihrole.index');
    Route::post('/PilihRole/choose', [PilihRoleController::class, 'choose'])->name('pilihrole.choose');
    Route::get('/BagianAkademik/KelolaRuang',[BagianAkademikController::class, 'KelolaRuang'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.KelolaRuang');
    Route::post('/BagianAkademik/KelolaRuang/store', [BagianAkademikController::class, 'storeRuang'])->name('bagianakademik.storeRuang');
    Route::put('/BagianAkademik/KelolaRuang/{id}', [BagianAkademikController::class, 'updateRuang'])->name('bagianakademik.updateRuang');
    Route::delete('/BagianAkademik/KelolaRuang/{id}', [BagianAkademikController::class, 'destroyRuang'])->name('bagianakademik.destroyRuang');
    Route::get('/BagianAkademik/KelolaProgramStudi',[BagianAkademikController::class,'KelolaProgramStudi'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.KelolaProgramStudi');
    Route::post('/BagianAkademik/KelolaProgramStudi/store', [BagianAkademikController::class, 'storeProgramStudi'])->name('bagianakademik.storeProgramStudi');
    Route::put('/BagianAkademik/KelolaProgramStudi/{id}', [BagianAkademikController::class, 'updateProgramStudi'])->name('bagianakademik.updateProgramStudi');
    Route::delete('/BagianAkademik/KelolaProgramStudi/{id}', [BagianAkademikController::class, 'destroyProgramStudi'])->name('bagianakademik.destroyProgramStudi');
    Route::get('/BagianAkademik/AlokasiRuangan',[BagianAkademikController::class, 'getAlokasi'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.AlokasiRuangan');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
