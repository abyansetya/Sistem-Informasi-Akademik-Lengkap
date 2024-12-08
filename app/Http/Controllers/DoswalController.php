<?php

namespace App\Http\Controllers;

use App\Models\Dosenpegawai;
// use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Mahasiswa;
use App\Models\RekapPrestasi;
use App\Models\Irs;
use App\Models\Jadwal;
use App\Models\TahunAjaran;
use App\Models\MataKuliah;
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
    $user = Auth::user();
    $roles = session('selected_role', 'default');
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
    
    $mahasiswa = Mahasiswa::where('NIP_wali', $doswal->NIP)
                        ->where('angkatan', $angkatan)
                        ->get();

    foreach ($mahasiswa as $mhs) {
        $irs = Irs::where('NIM', $mhs->NIM)
                  ->where('status', 'onprocess') // Filter status jika diperlukan
                  ->get();
        $mhs->irs = $irs; // Tambahkan IRS ke dalam setiap item mahasiswa
    }

    return Inertia::render('Doswal/VerifikasiIRSByAngkatan', [
        'user' => $user,
        'roles' => $roles,
        'angkatan' => $angkatan,
        'mahasiswa' => $mahasiswa,
    ]);
}

public function approveIRS(Request $request)
{
    $request->validate([
        'nim' => 'required|exists:mahasiswa,NIM', // Validasi nim mahasiswa
    ]);

    // Cari mahasiswa berdasarkan nim
    $mahasiswa = Mahasiswa::where('NIM', $request->nim)->first();
    if (!$mahasiswa) {
        return response()->json(['message' => 'Mahasiswa tidak ditemukan.'], 404);
    }

    // Cek apakah IRS sudah disetujui sebelumnya
    $irs = Irs::where('NIM', $mahasiswa->NIM)->first();
    if ($irs && $irs->status === 'approved') {
        return response()->json(['message' => 'IRS sudah memiliki status approved.'], 400);
    }

    // Update status IRS menjadi approved
    Irs::where('NIM', $mahasiswa->NIM)->update(['status' => 'approved']);

    // Kembalikan response sukses
    return response()->json(['message' => 'IRS berhasil disetujui.'], 200);
}

public function resetIRS(Request $request)
{
    $request->validate([
        'nim' => 'required|exists:mahasiswa,NIM', // Validasi nim mahasiswa
    ]);

    // Cari mahasiswa berdasarkan nim
    $mahasiswa = Mahasiswa::where('NIM', $request->nim)->first();
    if (!$mahasiswa) {
        return response()->json(['message' => 'Mahasiswa tidak ditemukan.'], 404);
    }

    // Cek apakah IRS sudah di-reset sebelumnya
    $irs = Irs::where('NIM', $mahasiswa->NIM)->first();
    if ($irs && $irs->status === 'onprocess') {
        return response()->json(['message' => 'IRS sudah memiliki status onprocess.'], 400);
    }

    // Update status IRS menjadi onprocess
    Irs::where('NIM', $mahasiswa->NIM)->update(['status' => 'onprocess']);

    // Kembalikan response sukses
    return response()->json(['message' => 'Status IRS berhasil di-reset ke Onprocess.'], 200);
}



public function approveAllIRS(Request $request)
{
    $angkatan = $request->angkatan;
    if (!$angkatan) {
        return response()->json([
            'success' => false,
            'message' => 'Angkatan tidak ditemukan atau tidak valid.',
        ], 400);
    }

    $user = Auth::user();
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();

    if (!$doswal) {
        return response()->json([
            'success' => false,
            'message' => 'Dosen pembimbing tidak ditemukan.',
        ], 404);
    }

    // Ambil mahasiswa berdasarkan angkatan
    $mahasiswa = Mahasiswa::where('NIP_wali', $doswal->NIP)
                        ->where('angkatan', $angkatan)
                        ->pluck('NIM');

    if ($mahasiswa->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => "Tidak ada mahasiswa ditemukan untuk angkatan $angkatan.",
        ], 404);
    }

    // Cek mahasiswa yang belum mengisi IRS
    $irsNIMs = Irs::whereIn('NIM', $mahasiswa)->pluck('NIM')->toArray();
    $mahasiswaBelumIRS = $mahasiswa->diff($irsNIMs);

    if ($mahasiswaBelumIRS->isNotEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'Terdapat mahasiswa yang belum mengisi IRS.',
            'mahasiswa_belum_irs' => $mahasiswaBelumIRS,
        ], 400);
    }

    // Update status IRS untuk mahasiswa yang memiliki data IRS
    $updated = Irs::whereIn('NIM', $mahasiswa)
                  ->where('status_pengambilan', 'onprocess')
                  ->update(['status_pengambilan' => 'approved']);

    return response()->json([
        'success' => true,
        'message' => "Berhasil menyetujui $updated IRS untuk mahasiswa angkatan $angkatan.",
    ]);
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

    // Controller
    public function Jadwalirs($nim)
{
    $user = Auth::user();
    $roles = session('selected_role', 'default');

    // Mendapatkan dosen yang memiliki user terkait
    $doswal = Dosenpegawai::where('user_id', $user->user_id)->first();
    
    // Mendapatkan mahasiswa berdasarkan NIM dan NIP wali
    $mahasiswa = Mahasiswa::where('NIP_wali', $doswal->NIP)
                          ->where('NIM', $nim)
                          ->first();

    // Memastikan mahasiswa ditemukan
    if (!$mahasiswa) {
        return redirect()->back()->with('error', 'Mahasiswa tidak ditemukan');
    }

    $tahun_ajaran = TahunAjaran::where('status', 'Aktif')->firstOrFail();

    // Mengambil tahun ajaran yang aktif
   
    if($tahun_ajaran){
        $irs = Irs::where("NIM", $nim)
        ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
        ->where('keterangan', $tahun_ajaran->keterangan)
        ->get();
    }
    $irs_ids = $irs->pluck('irs_id');

   
    $jadwal = Jadwal::join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->leftJoin('dosen_mk', 'jadwal.kode_mk', '=', 'dosen_mk.kode_mk')
        ->leftJoin('dosen_pegawai', 'dosen_mk.NIP', '=', 'dosen_pegawai.NIP')
        ->leftJoin('irs', 'irs.jadwal_id', '=','jadwal.jadwal_id')
        ->select(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'jadwal.nama_ruang',
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name AS mata_kuliah_name',
            'mata_kuliah.sks',
            'mata_kuliah.semester',
            'irs.status_pengambilan',
            DB::raw("GROUP_CONCAT(dosen_pegawai.Name SEPARATOR ', ') AS dosen_names")
        )
        ->where('jadwal.kode_prodi', $mahasiswa->kode_prodi)
        ->whereIn('irs.irs_id', $irs_ids) 
        ->groupBy(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'jadwal.nama_ruang',    
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name',
            'mata_kuliah.sks',
            'mata_kuliah.semester',
            'irs.status_pengambilan'
        )->get();
        

    // Kirim data ke frontend
    return Inertia::render('Doswal/Jadwalirs', [
        'user' => $user,
        'roles' => $roles,
        'mahasiswa' => $mahasiswa,
        'irs' => $jadwal                                                                                    
    ]);
}



// public function downloadPdf($nim)
// {
//     $irs = Irs::where('NIM', $nim)
//         ->join('jadwal', 'irs.jadwal_id', '=', 'jadwal.jadwal_id')
//         ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
//         ->select(
//             'mata_kuliah.kode_mk',
//             'mata_kuliah.Name AS mata_kuliah_name',
//             'mata_kuliah.sks',
//             'jadwal.hari',
//             'jadwal.jam_mulai',
//             'jadwal.jam_selesai',
//             'jadwal.nama_ruang'
//         )
//         ->get();

//     $mahasiswa = Mahasiswa::where('NIM', $nim)->first();

//     $pdf = PDF::loadView('irs-pdf', compact('irs', 'mahasiswa'));
//     return $pdf->download('irs_' . $nim . '.pdf');
// }



    
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