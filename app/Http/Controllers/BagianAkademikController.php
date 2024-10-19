<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RuangKelas;
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
    public function store(Request $request)
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
    public function update(Request $request, $id)
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
    public function destroy($id)
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
    
}