<?php

namespace App\Http\Controllers;

use App\Models\Dosenpegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Mahasiswa;
use App\Models\RekapPrestasi;
use App\Models\Irs;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DoswalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');

        // Kirim role ke frontend
        return Inertia::render('Doswal/Dashboard', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    
    public function mahasiswaPerwalian()
    {
        // Ambil data pengguna saat ini
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        
        // Gabungkan tabel mahasiswa dan rekap_prestasi berdasarkan NIM
        $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
        $mahasiswa = DB::table('mahasiswa')
        ->join('rekap_prestasi', 'mahasiswa.NIM', '=', 'rekap_prestasi.NIM')
        ->where('mahasiswa.NIP_wali', '=', $doswal->NIP)
        ->select('mahasiswa.*', 'rekap_prestasi.Tahun_Ajaran', 'rekap_prestasi.keterangan', 'rekap_prestasi.IPK', 'rekap_prestasi.SKSk', 'rekap_prestasi.Semester') // Pastikan IPK, SKS, dan Semester ada
        ->get();
        // Mengambil rekap_prestasi untuk setiap mahasiswa berdasarkan NIM
        $rekapALL = $mahasiswa->map(function($item) {
            return RekapPrestasi::where('NIM', $item->NIM)->get();
        });
    
        // dd($mahasiswa); // Untuk memastikan data yang didapatkan
        
        // Kirim data ke frontend
        return Inertia::render('Doswal/mahasiswaPerwalian', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa,
            'rekapALL' => $rekapALL
        ]);
    }
    
    public function verifikasiIRS()
{
    $user = Auth::user();
    $roles = session('selected_role', 'default');
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
    $mahasiswa = Mahasiswa::where('NIP_wali', $doswal->NIP)->get();
    
    // Ambil angkatan yang unik dari mahasiswa berdasarkan NIP_wali
    $angkatan = Mahasiswa::where('NIP_wali', $doswal->NIP)
        ->distinct('angkatan') // Mengambil hanya angkatan yang unik
        ->pluck('angkatan'); // Hanya mengambil kolom angkatan
        

    // Kirim role dan angkatan ke frontend
    return Inertia::render('Doswal/verifikasiIRS', [
        'user' => $user,
        'roles' => $roles,
        'doswal' => $doswal,
        'angkatan' => $angkatan,
        'mahasiswa' => $mahasiswa
    ]);
}
    public function verifikasiIRSByAngkatan($angkatan)
{
    // Pastikan $angkatan ada
    // dd($angkatan);

    $user = Auth::user();
    $roles = session('selected_role', 'default');
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
    // $irs = Irs::where('NIM',$mahasiswa->NIM)->get();
    
    // Ambil mahasiswa berdasarkan NIP_wali dan angkatan tertentu
    $mahasiswa = Mahasiswa::where('NIP_wali', $doswal->NIP)
                        ->where('angkatan', $angkatan)
                        ->get();
    foreach ($mahasiswa as $mhs) {
    $irs = Irs::where('NIM', $mhs->NIM)->get();
    $mhs->irs = $irs;} // Tambahkan IRS ke dalam setiap item mahasiswa
    return Inertia::render('Doswal/VerifikasiIRSByAngkatan', [
        'user' => $user,
        'roles' => $roles,
        'angkatan' => $angkatan,
        'mahasiswa' => $mahasiswa
    ]);
}

    public function approveAll(Request $request)
{
    $angkatan = $request->angkatan;

    if (!$angkatan) {
        return response()->json([
            'success' => false,
            'message' => 'Angkatan tidak ditemukan',
        ], 400);
    }

    $user = Auth::user();
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();

    // Update semua mahasiswa dengan NIP_wali dan angkatan tertentu
    $updated = Mahasiswa::where('NIP_wali', $doswal->NIP)
        ->where('angkatan', $angkatan)
        ->update(['status' => 'disetujui']); // Sesuaikan nama kolomnya

    if ($updated) {
        return response()->json([
            'success' => true,
            'message' => "Berhasil menyetujui semua mahasiswa untuk angkatan $angkatan.",
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => "Tidak ada data yang diperbarui.",
        ]);
    }
}

    public function statusPerkembangan()
    
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
        $mahasiswa = Mahasiswa::where('NIP_Wali', $doswal->NIP)->get();
        // Kirim role ke frontend
        return Inertia::render('Doswal/statusPerkembangan', [
            'user' => $user,
            'roles' => $roles,
            'doswal' => $doswal,
            'mahasiswa' => $mahasiswa
        ]);
    }
    public function monitoringMK()
    
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        // Kirim role ke frontend
        return Inertia::render('Doswal/monitoringMK', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}