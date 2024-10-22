<?php

namespace App\Http\Controllers;

use App\Models\AlokasiRuangan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RuangKelas;
use App\Models\ProgramStudi;
use Illuminate\Support\Facades\Auth;

class BagianAkademikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
               // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');

        // Kirim role ke frontend
        return Inertia::render('BagianAkademik/Dashboard', [
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
    public function storeRuang(Request $request)
    {
        // Validasi data input dari form
        $validatedData = $request->validate([
            'nama_ruang' => 'required|string|max:255',
            'gedung' => 'required|string|max:255',
            'kuota' => 'required|integer|min:11',
        ]);

        // Menyimpan data ke tabel RuangKelas
        RuangKelas::create([
            'nama_ruang' => $validatedData['nama_ruang'],
            'gedung' => $validatedData['gedung'],
            'kuota' => $validatedData['kuota'],
        ]);

        // Redirect kembali ke halaman kelola ruangan dengan pesan sukses
        return redirect()->back()->with('success', 'Ruangan baru berhasil ditambahkan');
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
    public function updateRuang(Request $request, $id)
    {
    // Validasi data
    $validatedData = $request->validate([
        'nama_ruang' => 'required|string|max:255',
        'gedung' => 'required|string|max:255',
        'kuota' => 'required|integer|min:11',
    ]);

    // Cari data ruangan yang akan diupdate
    $ruangKelas = RuangKelas::find($id);

    if ($ruangKelas) {
        // Update data
        $ruangKelas->update([
            'nama_ruang' => $validatedData['nama_ruang'],
            'gedung' => $validatedData['gedung'],
            'kuota' => $validatedData['kuota'],
        ]);

        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('success', 'Ruangan berhasil diupdate');
    } else {
        return redirect()->back()->with('error', 'Ruangan tidak ditemukan');
    }
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroyRuang($id)
    {
        $ruangKelas = RuangKelas::find($id);
    
        if ($ruangKelas) {
            $ruangKelas->delete();  // Menghapus ruangan
            return redirect()->back()->with('success', 'Ruangan berhasil dihapus');
        } else {
            return redirect()->back()->with('error', 'Ruangan tidak ditemukan');
        }
    }
    
    public function KelolaRuang(User $user)
    {
        $ruangKelas = RuangKelas::paginate(15);
        return inertia::render('BagianAkademik/KelolaRuang',['ruangKelas' => $ruangKelas]);
    }
    
    public function KelolaProgramStudi (User $user)
    {
        $programStudi = ProgramStudi::all();
        return inertia::render('BagianAkademik/KelolaProgramStudi',['programStudi' => $programStudi]);
    }

    public function storeProgramStudi(Request $request)
    {
        // Validasi data input dari form
        $validatedData = $request->validate([
            'kode_program_studi' => 'required|string|max:255',
            'nama_program_studi' => 'required|string|max:255',
            'fakultas' => 'required|string|max:255',
        ]);

        // Menyimpan data ke tabel ProgramStudi
        ProgramStudi::create([
            'kode_program_studi' => $validatedData['kode_program_studi'],
            'nama_program_studi' => $validatedData['nama_program_studi'],
            'fakultas' => $validatedData['fakultas'],
        ]);

        // Redirect kembali ke halaman kelola program studi dengan pesan sukses
        return redirect()->back()->with('success', 'Program Studi baru berhasil ditambahkan');
    }

    public function updateProgramStudi(Request $request, $id)
    {
    // Validasi data
    $validatedData = $request->validate([
        'kode_program_studi' => 'required|string|max:255',
        'nama_program_studi' => 'required|string|max:255',
        'fakultas' => 'required|string|max:255',
    ]);

    // Cari data ruangan yang akan diupdate
    $programStudi = ProgramStudi::find($id);

    if ($programStudi) {
        // Update data
        $programStudi->update([
            'kode_program_studi' => $validatedData['kode_program_studi'],
            'nama_program_studi' => $validatedData['nama_program_studi'],
            'fakultas' => $validatedData['fakultas'],
        ]);

        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('success', 'Program Studi berhasil diupdate');
    } else {
        return redirect()->back()->with('error', 'Program Studi tidak ditemukan');
    }
    }

    public function destroyProgramStudi($id)
    {
        $programStudi = ProgramStudi::find($id);
    
        if ($programStudi) {
            $programStudi->delete();  // Menghapus ruangan
            return redirect()->back()->with('success', 'Program Studi berhasil dihapus');
        } else {
            return redirect()->back()->with('error', 'Program Studi tidak ditemukan');
        }
    }

    public function storeAlokasi (Request $request){
        $validatedData = $request->validate([
            'program_studi_id' => 'required|exists:program_studi_id',
            'ruang_kelas_id' => 'required|array',
            'ruang_kelas_id.*' => 'exists:ruang_kelas_id',
        ]);

        foreach($request->ruang_kelas_id as $ruangId){
            AlokasiRuangan::created([
                'program_studi_id'=> $validatedData['program_studi_id'],
                'ruang_kelas_id' => $ruangId,
                'status' => 'pending',
            ]);
        }
        return redirect()->back()-with('success', 'ruangan berhasil di alokasikan');
    }

    public function getAlokasi(){
        $alokasi = AlokasiRuangan::with('programStudi', 'ruangKelas')->get();
        return Inertia::render('BagianAkademik/AlokasiRuangan', [
            'alokasiData' => $alokasi,
            'programStudiData' => ProgramStudi::all(),
            'ruangKelasData' => RuangKelas::all(),
        ]);
    }
}