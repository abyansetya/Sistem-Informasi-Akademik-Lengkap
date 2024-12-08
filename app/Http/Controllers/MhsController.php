<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Dosenpegawai;
use App\Models\Irs;
use App\Models\Jadwal;
use App\Models\Khs;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use App\Models\RekapPrestasi;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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
        $tahun_ajaran = TahunAjaran::where('status', 'Aktif')->firstOrFail();
       
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali )->first();
        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        // Periksa apakah tahun ajaran aktif ditemukan
        $rekapsmt = collect(); // Default nilai kosong
        if ($tahun_ajaran) {
            $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
                ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
                ->where('keterangan', $tahun_ajaran->keterangan)
                ->get();
        }
        // dd($rekapsmt);

            // Hitung IPK
        $ipData = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->whereNotNull('IP_Semester')
        ->get();

        $totalIp = $ipData->sum('IP_Semester');
        $jumlahSemester = $ipData->count();
        $ipk = $jumlahSemester > 0 ? round($totalIp / $jumlahSemester, 2) : null;

        //hitung sksk
        $sksData = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->whereNotNull('IP_Semester')
        ->get();
        $sksk = $sksData->sum('SKS');
    
        // Kirim data ke frontend
        return Inertia::render('Mhs/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa, // Mengirim data mahasiswa
            'tahun_ajaran' => $tahun_ajaran,
            'prodi' => $prodi,
            'doswal' => $doswal,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt,
            'ipk' => $ipk,
            'sksk' => $sksk,
            'ipData' => $ipData
        ]);
    }

    public function IRS() {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first();
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali)->first();
        $tahun_ajaran = TahunAjaran::where('status', 'Aktif')->firstOrFail();

        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        $rekapsmt = collect(); // Default nilai kosong
        if ($tahun_ajaran) {
            $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
                ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
                ->where('keterangan', $tahun_ajaran->keterangan)
                ->get();
        }
    
        $matakuliah = MataKuliah::where("kode_prodi", $mahasiswa->kode_prodi)->get();

        $irs = collect();
        if($tahun_ajaran){
            $irs = Irs::where("NIM", $mahasiswa->NIM)
            ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
            ->where('keterangan', $tahun_ajaran->keterangan)
            ->get();
        }
    

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
        )
        ->get();
        
    
        return Inertia::render('Mhs/IRS', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa,
            'doswal' => $doswal,
            'tahun_ajaran' => $tahun_ajaran,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt,
            'matakuliah' => $matakuliah,
            'jadwal' => $jadwal,
            'irs' => $irs
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