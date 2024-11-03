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
    // Cari Program Studi berdasarkan ID
    $programStudi = ProgramStudi::find($id);

    if ($programStudi) {
        // Hapus Program Studi jika ditemukan
        $programStudi->delete();
        return redirect()->back()->with('success', 'Program Studi berhasil dihapus');
    } else {
        return redirect()->back()->with('error', 'Program Studi tidak ditemukan');
    }
}


    public function storeAlokasi(Request $request)
    {
        // Validasi data yang diterima dari frontend
        $validatedData = $request->validate([
            'program_studi_id' => 'required|integer',
            'ruang_kelas_id' => 'required|array',
            'ruang_kelas_id.*' => 'integer',
        ]);
    
        // Iterasi melalui setiap ruang_kelas_id yang diterima
        foreach ($validatedData['ruang_kelas_id'] as $ruangId) {
            $alokasiBaru = AlokasiRuangan::create([
                'program_studi_id' => $validatedData['program_studi_id'],
                'ruang_kelas_id' => $ruangId,
                'status' => 'pending',
            ]);
        }
    
        redirect()->back()->with('success', 'Alokasi berhasil ditambahkan');
    }
    

    public function getAlokasi(){
        $alokasi = AlokasiRuangan::with('programStudi', 'ruangKelas')->get();
        return Inertia::render('BagianAkademik/AlokasiRuangan', [
            'alokasiData' => $alokasi,
            'programStudiData' => ProgramStudi::all(),
            'ruangKelasData' => RuangKelas::all(),
        ]);
    }

    public function updateAlokasi(Request $request, $id)
{
    // Validasi input
    $validatedData = $request->validate([
        'program_studi_id' => 'required|exists:program_studi,id',
        'ruang_kelas_id' => 'required|array',
        'ruang_kelas_id.*' => 'exists:ruang_kelas,id',
    ]);

    // Cari alokasi yang akan diupdate
    $alokasi = AlokasiRuangan::find($id);

    if ($alokasi) {
        // Update program studi dan ruangan kelas
        $alokasi->program_studi_id = $validatedData['program_studi_id'];
        $alokasi->ruang_kelas_id = $validatedData['ruang_kelas_id'];
        $alokasi->save();

        return redirect()->back()->with('success', 'Alokasi berhasil diupdate');
    } else {
        return redirect()->back()->with('error', 'Alokasi tidak ditemukan');
    }
}

public function destroyAlokasi($id)
{
    // Cari alokasi berdasarkan ID
    $alokasi = AlokasiRuangan::find($id);

    if ($alokasi) {
        // Hapus alokasi
        $alokasi->delete();
        return redirect()->back()->with('success', 'Alokasi berhasil dihapus');
    } else {
        return redirect()->back()->with('error', 'Alokasi tidak ditemukan');
    }
}

}