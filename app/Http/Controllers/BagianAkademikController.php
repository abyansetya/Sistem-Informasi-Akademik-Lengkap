<?php

namespace App\Http\Controllers;


use App\Models\Dosenpegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RuangKelas;
use App\Models\ProgramStudi;
use App\Models\Ruang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
        // Kirim role ke frontend
        return Inertia::render('BagianAkademik/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'dosen' => $dosen
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
        Ruang::create([
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
    $ruangKelas = Ruang::find($id);

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
        $ruangKelas = Ruang::find($id);
    
        if ($ruangKelas) {
            $ruangKelas->delete();  // Menghapus ruangan
            return redirect()->back()->with('success', 'Ruangan berhasil dihapus');
        } else {
            return redirect()->back()->with('error', 'Ruangan tidak ditemukan');
        }
    }
    
    public function KelolaRuang(User $user)
    {
        $ruangKelas = Ruang::paginate(15);
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
            'kode_prodi' => 'required|string|max:255',
            'nama_prodi' => 'required|string|max:255',
        ]);

        // Menyimpan data ke tabel ProgramStudi
        ProgramStudi::create([
            'kode_prodi' => $validatedData['kode_prodi'],
            'nama_prodi' => $validatedData['nama_prodi'],
        ]);

        // Redirect kembali ke halaman kelola program studi dengan pesan sukses
        return redirect()->back()->with('success', 'Program Studi baru berhasil ditambahkan');
    }

    public function updateProgramStudi(Request $request, $id)
    {
    // Validasi data
    $validatedData = $request->validate([
        'kode_prodi' => 'required|string|max:255',
        'nama_prodi' => 'required|string|max:255',
    ]);

    // Cari data ruangan yang akan diupdate
    $programStudi = ProgramStudi::find($id);

    if ($programStudi) {
        // Update data
        $programStudi->update([
            'kode_prodi' => $validatedData['kode_prodi'],
            'nama_prodi' => $validatedData['nama_prodi'],
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
        // dd($programStudi); // Add this for debugging
    
        if ($programStudi) {
            $programStudi->delete();
            return redirect()->back()->with('success', 'Program Studi berhasil dihapus');
        } else {
            return redirect()->back()->with('error', 'Program Studi tidak ditemukan');
        }
    }
    


  

    public function storeAlokasi(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'kode_prodi' => 'required|exists:program_studi,kode_prodi',
            'ruang_id' => 'required|array',
            'ruang_id.*' => 'exists:ruang,id',
        ]);
    
        // Iterasi melalui ruang yang dipilih dan update
        foreach ($validatedData['ruang_id'] as $ruangId) {
            // Menggunakan query builder untuk update alokasi ruang
            DB::table('ruang')
                ->where('id', $ruangId)
                ->whereNull('kode_prodi') // Hanya update jika kode_prodi masih null (belum dialokasikan)
                ->update(['kode_prodi' => $validatedData['kode_prodi']]);
        }
    
        return redirect()->back()->with('success', 'Alokasi berhasil ditambahkan');
    }
    

    
    

    public function getAlokasi()
    {
        return Inertia::render('BagianAkademik/AlokasiRuangan', [
            'programStudiData' => ProgramStudi::all(),
            'ruangKelasData' => Ruang::all(),
        ]);
    }
    

    public function updateAlokasi(Request $request, $id)
{
    // Validasi input
    $validatedData = $request->validate([
        'program_studi_id' => 'required|exists:program_studi,id',
        'ruang_id' => 'required|array',
        'ruang_id.*' => 'exists:ruang,id',
    ]);

    // Ambil kode prodi yang baru
    $kodeProdi = $validatedData['program_studi_id'];

    // Cari alokasi yang akan diupdate
    foreach ($validatedData['ruang_id'] as $ruangId) {
        // Cari ruang berdasarkan ID
        $ruang = Ruang::find($ruangId);

        if ($ruang) {
            // Hanya update jika kode_prodi masih null
            if (is_null($ruang->kode_prodi)) {
                $ruang->update([
                    'kode_prodi' => $kodeProdi,
                ]);
            }
        }
    }

    return redirect()->back()->with('success', 'Alokasi berhasil diupdate');
}

    

public function destroyAlokasi($id)
{
    // Cari alokasi berdasarkan ID
    $alokasi = Ruang::find($id);

    if ($alokasi) {
        // Hapus alokasi
        $alokasi->delete();
        return redirect()->back()->with('success', 'Alokasi berhasil dihapus');
    } else {
        return redirect()->back()->with('error', 'Alokasi tidak ditemukan');
    }
}

}