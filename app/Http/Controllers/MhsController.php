<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Dosenpegawai;
use App\Models\ProgramStudi;
use App\Models\RekapPrestasi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        // Ambil data mahasiswa berdasarkan NIM yang cocok dengan nim_nip pada tabel users
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first(); // Assuming 'nim' in Mahasiswa table and 'nim_nip' in Users table
        $prodi = ProgramStudi::where('kode_prodi', $mahasiswa->kode_prodi)->first();
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali )->first();
        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->where('Tahun_Ajaran', '2024/2025')
        ->where('keterangan', 'ganjil')
        ->get();
    
        // Kirim data ke frontend
        return Inertia::render('Mhs/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa, // Mengirim data mahasiswa
            'prodi' => $prodi,
            'doswal' => $doswal,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt
        ]);
    }

    public function IRS(){
        // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        // Ambil data mahasiswa berdasarkan NIM yang cocok dengan nim_nip pada tabel users
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first(); // Assuming 'nim' in Mahasiswa table and 'nim_nip' in Users table

        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali )->first();
        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->where('Tahun_Ajaran', '2024/2025')
        ->where('keterangan', 'ganjil')
        ->get();

        return Inertia::render('Mhs/IRS', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa, // Mengirim data mahasiswa

            'doswal' => $doswal,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt
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
    public function store(StoreUserRequest $request)
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
    public function update(UpdateUserRequest $request, User $user)
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