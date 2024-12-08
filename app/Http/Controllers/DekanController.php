<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Dosenpegawai;
use App\Models\Jadwal;
use App\Models\ProgramStudi;
use App\Models\Ruang;
use App\Models\RuangKelas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class DekanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();

        // Kirim role ke frontend
        return Inertia::render('Dekan/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'dosen' => $dosen
        ]);
    }

    public function kelolaruang()
    {

        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
        // Ambil daftar program studi
        $prodi = ProgramStudi::select('kode_prodi', 'nama_prodi')->get();

        // Eager load program studi dari relasi programStudi    
        $ruangKelas = DB::table('ruang')
        ->join('program_studi', 'ruang.kode_prodi', '=', 'program_studi.kode_prodi')
        ->select('ruang.*', 'program_studi.nama_prodi')
        ->where('ruang.status', '<>', 'pending')
        ->paginate(15);
    

        return Inertia::render('Dekan/KelolaRuang', [
            'user' => $user,
            'roles' => $roles,
            'ruangkelas' => $ruangKelas,
            'dosen' => $dosen,
            'prodi' => $prodi
        ]);
    }

    public function jadwalKuliah(Request $request)
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
        
        // Get the requested prodi and search term
        $currentProdi = $request->prodi;
        $search = $request->search;
        
        // Base query
        $query = DB::table('jadwal')
            ->join('program_studi', 'jadwal.kode_prodi', '=', 'program_studi.kode_prodi')
            ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->select('jadwal.*', 'program_studi.nama_prodi', 'mata_kuliah.Name')
            ->where('jadwal.status', '<>', 'pending');
    
        // Add prodi filter if specified
        if ($currentProdi) {
            $query->where('jadwal.kode_prodi', $currentProdi);
        }
    
        // Add search filter if specified
        if ($search) {
            $query->where('mata_kuliah.Name', 'like', "%{$search}%");
        }
    
        // Get paginated results
        $jadwalKuliah = $query->paginate(100)->withQueryString();
    
        // Get all prodi for the accordion
        $prodi = ProgramStudi::select('kode_prodi', 'nama_prodi')->get();
    
        return Inertia::render('Dekan/JadwalKuliah', [
            'user' => $user,
            'roles' => $roles,
            'jadwalKuliah' => $jadwalKuliah,
            'dosen' => $dosen,
            'prodi' => $prodi,
        ]);
    }

    public function jadwalDetail(Request $request, $kode_prodi)
{
    $user = Auth::user();
    $roles = session('selected_role', 'default');
    $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
    
    // Get the prodi details
    $prodi = ProgramStudi::where('kode_prodi', $kode_prodi)->firstOrFail();
    
    // Get jadwal for this prodi
    $jadwalKuliah = DB::table('jadwal')
        ->join('program_studi', 'jadwal.kode_prodi', '=', 'program_studi.kode_prodi')
        ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->select('jadwal.*', 'program_studi.nama_prodi', 'mata_kuliah.Name')
        ->where('jadwal.status', '<>', 'pending')
        ->where('jadwal.kode_prodi', $kode_prodi)
        ->paginate(10);

    return Inertia::render('Dekan/JadwalDetail', [
        'user' => $user,
        'roles' => $roles,
        'jadwalKuliah' => $jadwalKuliah,
        'dosen' => $dosen,
        'prodi' => $prodi
    ]);
}

public function kelasDetail($kode_prodi)
{
    try {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
        
        // Mengambil informasi prodi
        $prodi = ProgramStudi::where('kode_prodi', $kode_prodi)->first();
        
        if (!$prodi) {
            return redirect()->back()->with('error', 'Program Studi tidak ditemukan');
        }

        // Mengambil semua ruangan untuk prodi tersebut
        $ruangan = DB::table('ruang')
            ->join('program_studi', 'ruang.kode_prodi', '=', 'program_studi.kode_prodi')
            ->select('ruang.*', 'program_studi.nama_prodi')
            ->where('ruang.kode_prodi', $kode_prodi)
            ->where('ruang.status', '<>', 'pending')
            ->paginate(15);

        return Inertia::render('Dekan/RuangDetail', [
            'user' => $user,
            'roles' => $roles,
            'dosen' => $dosen,
            'prodi' => $prodi,
            'ruangan' => $ruangan
        ]);

    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
    }
}

    // Fungsi untuk menyetujui semua ruangan dalam satu prodi
    public function setujuiProdiRuang($kode_prodi)
    {
        // Update all schedules for the given prodi
        Ruang::where('kode_prodi', $kode_prodi)->update(['status' => 'approved']);
        
        return response()->json([
            'message' => 'Semua jadwal telah disetujui!',
        ]);
    }

    // Fungsi untuk menolak semua ruangan dalam satu prodi
    public function tolakProdiRuang($kode_prodi)
    {
        try {
            DB::table('ruang')
                ->where('kode_prodi', $kode_prodi)
                ->where('status', '<>', 'pending')
                ->update(['status' => 'rejected']);

            return response()->json(['message' => 'Semua ruangan berhasil ditolak']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }


    

    public function setujui($id)
    {
        // Cari ruang kelas berdasarkan ID
        $ruangKelas = Ruang::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $ruangKelas->status = 'approved';
        
        // Simpan perubahan ke database
        $ruangKelas->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        response()->json(['message' => 'Ruang Kelas Berhasil Disetujui']);
    }

    public function setujuiProdiJadwal($kodeProdi)
    {
        // Update all schedules for the given prodi
        Jadwal::where('kode_prodi', $kodeProdi)->update(['status' => 'approved']);
        
        return response()->json([
            'message' => 'Semua jadwal telah disetujui!',
        ]);
    }
    

    public function tolakProdiJadwal($kodeProdi)
    {
        // Find all jadwal for the given prodi and update their status to approved
        Jadwal::where('kode_prodi', $kodeProdi)->update(['status' => 'rejected']);
    
        return response()->json([
            'message' => 'Semua jadwal telah diTolak!',
        ]);
    }

    public function resetProdiJadwal($kodeProdi)
    {
        // Find all jadwal for the given prodi and update their status to approved
        Jadwal::where('kode_prodi', $kodeProdi)->update(['status' => 'onprocess']);

        return response()->json([
            'message' => 'Semua jadwal telah diTolak!',
        ]);
    }

    public function resetProdiRuang($kodeProdi)
    {
        // Find all jadwal for the given prodi and update their status to approved
        Ruang::where('kode_prodi', $kodeProdi)->update(['status' => 'onprocess']);

        return response()->json([
            'message' => 'Semua jadwal telah direset!',
        ]);
    }

    public function setujuiJadwal($jadwal_id)
    {
        // Cari ruang kelas berdasarkan ID
        $jadwalKuliah = Jadwal::findOrFail($jadwal_id);
    
        // Ubah status menjadi 'Disetujui'
        $jadwalKuliah->status = 'approved';
        
        // Simpan perubahan ke database
        $jadwalKuliah->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        response()->json(['message' => 'Jadwal Berhasil Disetujui']);
    }
    
    public function tolak($id)
    {
        // Cari ruang kelas berdasarkan ID
        $ruangKelas = Ruang::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $ruangKelas->status = 'rejected';
        
        // Simpan perubahan ke database
        $ruangKelas->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        return redirect()->route('dekan.kelolaruang')->with([
            'success' => true,
            'status' => $ruangKelas->status,
        ]);
    }

    public function tolakJadwal($id)
    {
        // Cari ruang kelas berdasarkan ID
        $jadwalKuliah = Jadwal::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $jadwalKuliah->status = 'rejected';
        
        // Simpan perubahan ke database
        $jadwalKuliah->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        return redirect()->route('dekan.jadwalkuliah')->with([
            'success' => true,
            'status' => $jadwalKuliah->status,
        ]);
    }

    public function reset($id)
    {
        // Cari ruang kelas berdasarkan ID
        $ruangKelas = Ruang::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $ruangKelas->status = 'onprocess    ';
        
        // Simpan perubahan ke database
        $ruangKelas->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        return redirect()->route('dekan.kelolaruang')->with([
            'success' => true,
            'status' => $ruangKelas->status,
        ]);
    }

    public function resetJadwal($id)
    {
        // Cari ruang kelas berdasarkan ID
        $jadwalKuliah = Jadwal::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $jadwalKuliah->status = 'onprocess    ';
        
        // Simpan perubahan ke database
        $jadwalKuliah->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        return redirect()->route('dekan.jadwalkuliah')->with([
            'success' => true,
            'status' => $jadwalKuliah->status,
        ]);
    }

    public function setujuiAll()
    {

        // Mengupdate status semua data menjadi 'approved'
        Ruang::whereIn('status', ['onprocess', 'approved', 'rejected'])->update(['status' => 'approved']);
    
        return redirect()->route('dekan.kelolaruang')->with([
            'success' => true,
            'message' => 'Semua ruang berhasil disetujui',
        ]);
    }

    public function setujuiAllJadwal()
    {

        // Mengupdate status semua data menjadi 'approved'
        Jadwal::whereIn('status', ['onprocess', 'approved', 'rejected'])->update(['status' => 'approved']);
    
        return redirect()->route('dekan.jadwalkuliah')->with([
            'success' => true,
            'message' => 'Semua ruang berhasil disetujui',
        ]);
    }

    public function resetAll()
    {

    
        // Mengupdate status semua data menjadi 'approved'
        Ruang::whereIn('status', ['approved', 'rejected'])->update(['status' => 'onprocess']);
    
        return redirect()->route('dekan.kelolaruang')->with([
            'success' => true,
            'message' => 'Semua ruang berhasil disetujui',
        ]);
    }

    public function resetAllJadwal()
    {

    
        // Mengupdate status semua data menjadi 'approved'
        Jadwal::whereIn('status', ['approved', 'rejected'])->update(['status' => 'onprocess']);
    
        return redirect()->route('dekan.jadwalkuliah')->with([
            'success' => true,
            'message' => 'Semua ruang berhasil disetujui',
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
