<?php

namespace App\Http\Controllers;

use App\Models\DosenMk;
use App\Models\User;
use App\Models\MataKuliah;
use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// DASHBOARD
class KaprodiController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        
        return Inertia::render('Kaprodi/Dashboard', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    // JADWALKULIAH
    public function jadwalKuliah(Request $request)
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        
        $query = DB::table('mata_kuliah')->select('id', 'Name', 'sks', 'semester');
        
        if ($request->has('semester')) {
            $query->where('semester', $request->semester);
        }

        if ($request->has('nama_mata_kuliah')) {
            $query->where('Name', 'like', '%' . $request->nama_mata_kuliah . '%');
        }

        $mataKuliah = $query->get();
    
        return Inertia::render('Kaprodi/JadwalKuliah', [
            'user' => $user,
            'roles' => $roles,
            'mataKuliah' => $mataKuliah,
        ]);
    }

    public function tambahMataKuliah(Request $request)
    {
        DB::beginTransaction(); // Start a database transaction
    
        try {
            // Validasi data dari form
            $validatedData = $request->validate([
                'kodeMK' => 'required|unique:mata_kuliahs,kodeMK|max:10',
                'name' => 'required|max:255',
                'sks' => 'required|integer',
                'semester' => 'required|integer',
                'prioritasSemester' => 'required|integer',
            ]);
    
            // Menyimpan data mata kuliah ke database
            MataKuliah::create($validatedData);
    
            DB::commit(); // Commit the transaction if everything is fine
    
            // Kembali ke halaman dengan status sukses
            return redirect()->route('kaprodi.jadwalKuliah')->with('success', 'Mata kuliah berhasil ditambahkan!');
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction if an error occurs
    
            // Log the error for debugging
            Log::error('Error adding mata kuliah: ' . $e->getMessage());
    
            // Kembali ke halaman sebelumnya dengan pesan error
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menambahkan mata kuliah. Silakan coba lagi.']);
        }
    }
    

    // JADWALDETAIL
    public function jadwalDetail($id)
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $mataKuliah = DB::table('mata_kuliah')->where('id', $id)->first();
        $dosenList = DB::table('dosen_pegawai')->select('NIP', 'Name')->get();
        $ruangList = DB::table('ruang')->select('id', 'nama_ruang')->get();
    
        return Inertia::render('Kaprodi/JadwalDetail', [
            'user' => $user,
            'roles' => $roles,
            'mataKuliah' => $mataKuliah,
            'dosenList' => $dosenList,
            'ruangList' => $ruangList,
        ]);
    }
    public function simpanJadwal(Request $request)
{

    try {
        // Validate input data
        $validatedData = $request->validate([
            'kode_mk' => 'required|exists:mata_kuliah,kode_mk',
            'nip_dosen' => 'required|exists:dosen_pegawai,nip', // Assuming the column name is 'nip'
            'nama_ruang' => 'required|exists:ruang,nama_ruang',
            'kode_prodi' => 'required|exists:program_studi,kode_prodi',
            'hari' => 'required|string',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'kelas' => 'required|string',

        ]);

        // Save data to the database

        DB::beginTransaction();

        Jadwal::create([
            'kode_mk' => $validatedData['kode_mk'],
            'nip_dosen' => $validatedData['nip_dosen'],
            'nama_ruang' => $validatedData['nama_ruang'],
            'kode_prodi' => $validatedData['kode_prodi'],
            'hari' => $validatedData['hari'],
            'jam_mulai' => $validatedData['jam_mulai'],
            'jam_selesai' => $validatedData['jam_selesai'],
            'kelas' => $validatedData['kelas'],
            'status' => 'pending',

        ]);

        DosenMk::create([
            'NIP' => $validatedData['nip_dosen'],
            'kode_mk' => $validatedData['kode_mk'],
        ]);

        DB::commit();

        // Redirect with success message

        return redirect()->route('kaprodi.jadwalKuliah')

            ->with('success', 'Jadwal Kuliah berhasil disimpan!');

    } catch (\Exception $e) {

        DB::rollBack();

        Log::error('Error saving jadwal: ' . $e->getMessage());

        return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan jadwal. Silakan coba lagi.']);

    }

}

    public function hapusJadwal($id)
    {
        DB::beginTransaction();

        try {
            // Hapus jadwal berdasarkan ID
            DB::table('jadwal')->where('id', $id)->delete();

            DB::commit();
            return redirect()->route('kaprodi.jadwalKuliah')->with('success', 'Jadwal berhasil dihapus!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function cekJadwal($kode_mk, $kelas)
    {
        $jadwal = Jadwal::where('kode_mk', $kode_mk)
                        ->where('kelas', $kelas)
                        ->first();

        return response()->json(['exists' => $jadwal ? true : false]);
    }

    public function cekRuangTersedia(Request $request)
{
    $validatedData = $request->validate([
        'hari' => 'required|string',
        'jam_mulai' => 'required|date_format:H:i',
        'jam_selesai' => 'required|date_format:H:i',
    ]);

    // Get all rooms
    $semuaRuang = DB::table('ruang')->select('id', 'nama_ruang')->get();

    // Find rooms already booked during the specified time
    $ruangTerpakai = DB::table('jadwal')
        ->where('hari', $validatedData['hari'])
        ->where(function($query) use ($validatedData) {
            $query->where(function($q) use ($validatedData) {
                // Check if new schedule overlaps with existing schedules
                $q->where('jam_mulai', '<', $validatedData['jam_selesai'])
                  ->where('jam_selesai', '>', $validatedData['jam_mulai']);
            });
        })
        ->pluck('nama_ruang');

    // Filter out booked rooms
    $ruangTersedia = $semuaRuang->reject(function ($ruang) use ($ruangTerpakai) {
        return $ruangTerpakai->contains($ruang->nama_ruang);
    });

    return response()->json($ruangTersedia);
}

    // MAHASISWA
    public function mahasiswa()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $students = DB::table('students')->select('id', 'nama', 'nim', 'angkatan', 'status_irs')->get();

        return Inertia::render('Kaprodi/Mahasiswa', [
            'user' => $user,
            'roles' => $roles,
            'students' => $students,
        ]);
    }

    // MONITORING
    public function monitoring()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        
        return Inertia::render('Kaprodi/Monitoring', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }
}
