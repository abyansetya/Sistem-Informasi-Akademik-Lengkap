<?php

use App\Http\Controllers\BagianAkademikController;
use App\Http\Controllers\ChartDataController;
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

// Route::get('/', function () {
//     return response()->json(['instance' => env('APP_NAME', gethostname())]);
// });



use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (!Auth::check()) {
        // Jika user belum login, arahkan ke halaman login
        return redirect()->route('login');
    }

    // Jika user sudah login, cek role dari session
    $selectedRole = session('selected_role');

    // Arahkan berdasarkan role yang sudah disimpan di session
    switch ($selectedRole) {
        case 'Mahasiswa':
            return redirect()->route('mhs.index');
        case 'Dekan':
            return redirect()->route('dekan.index');
        case 'Ketua Prodi':
            return redirect()->route('kaprodi.index');
        case 'Pembimbing Akademik':
            return redirect()->route('doswal.index');
        case 'Bagian Akademik':
            return redirect()->route('bagianakademik.index');
        default:
            // Jika role tidak ditemukan, arahkan ke login
            return redirect()->route('login');
    }
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/Mhs/dashboard', [MhsController::class, 'index'])->middleware(CheckRole::class.':Mahasiswa')->name('mhs.index');
    Route::get('/Dekan/dashboard', [DekanController::class, 'index'])->middleware(CheckRole::class.':Dekan')->name('dekan.index');
    Route::get('/Dekan/KelolaRuang', [DekanController::class, 'kelolaruang'])->middleware(CheckRole::class.':Dekan')->name('dekan.kelolaruang');
    Route::get('/Dekan/JadwalKuliah', [DekanController::class, 'jadwalKuliah'])->middleware(CheckRole::class.':Dekan')->name('dekan.jadwalkuliah');
    Route::post('/Dekan/{id}/setujui', [DekanController::class, 'setujui'])->name('dekan.setujui');
    Route::post('/Dekan/{jadwal_id}/setujuiJadwal', [DekanController::class, 'setujuiJadwal'])->name('dekan.setujuiJadwal');
    Route::post('/Dekan/{id}/tolak', [DekanController::class, 'tolak'])->name('dekan.tolak');
    Route::post('/Dekan/{id}/tolakJadwal', [DekanController::class, 'tolakJadwal'])->name('dekan.tolakJadwal');
    Route::post('/Dekan/{id}/reset', [DekanController::class, 'reset'])->name('dekan.reset');
    Route::post('/Dekan/{id}/resetJadwal', [DekanController::class, 'resetJadwal'])->name('dekan.resetJadwal');
    Route::post('/Dekan/setujuiAll', [DekanController::class, 'setujuiAll'])->name('dekan.setujuiAll');
    Route::post('/Dekan/setujuiAllJadwal', [DekanController::class, 'setujuiAllJadwal'])->name('dekan.setujuiAllJadwal');
    Route::post('/Dekan/resetAll', [DekanController::class, 'resetAll'])->name('dekan.resetAll');
    Route::post('/Dekan/resetAllJadwal', [DekanController::class, 'resetAllJadwal'])->name('dekan.resetAllJadwal');
    Route::get('/ChartData/persetujuanRuang', [ChartDataController::class, 'persetujuanRuang'])->name('chartdata.persetujuanRuang');
    Route::get('/ChartData/progressRuang', [ChartDataController::class, 'progressRuang'])->name('chartdata.progressRuang');
    Route::get('/ChartData/persetujuanJadwal', [ChartDataController::class, 'persetujuanJadwal'])->name('chartdata.persetujuanJadwal');
    Route::get('/ChartData/progressJadwal', [ChartDataController::class, 'progressJadwal'])->name('chartdata.progressJadwal');
    Route::get('/BagianAkademik/dashboard', [BagianAkademikController::class, 'index'])->middleware(CheckRole::class.':Bagian Akademik')->name('bagianakademik.index');
    Route::get('/Doswal/dashboard', [DoswalController::class, 'index'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.index');
    Route::get('/Doswal/mahasiswaPerwalian', [DoswalController::class, 'mahasiswaPerwalian'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.mahasiswaPerwalian');
    Route::get('/Doswal/verifikasiIRS', [DoswalController::class, 'verifikasiIRS'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.verifikasiIRS');
    Route::get('/Doswal/statusPerkembangan', [DoswalController::class, 'statusPerkembangan'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.statusPerkembangan');
    Route::get('/Doswal/monitoringMK', [DoswalController::class, 'monitoringMK'])->middleware(CheckRole::class.':Pembimbing Akademik')->name('doswal.monitoringMK');
    Route::get('/Kaprodi/dashboard', [KaprodiController::class, 'index'])->middleware(CheckRole::class.':Ketua Prodi')->name('kaprodi.index');
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
    Route::get('/doswal/mahasiswaPerwalian', [MhsController::class, 'mahasiswaPerwalian'])->name('mahasiswa.perwalian');
    Route::post('/BagianAkademik/AlokasiRuangan/store', [BagianAkademikController::class, 'storeAlokasi'])->name('bagianakademik.storeAlokasi');
    Route::put('/BagianAkademik/AlokasiRuangan/{id}', [BagianAkademikController::class, 'updateAlokasi'])->name('bagianakademik.updateAlokasi');
    Route::delete('/BagianAkademik/AlokasiRuangan/{id}', [BagianAkademikController::class, 'destroyAlokasi'])->name('bagianakademik.destroyAlokasi');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';