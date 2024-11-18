<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Dosenpegawai;
use App\Models\Ruang;
use App\Models\RuangKelas;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        // Eager load program studi dari relasi programStudi    
        $ruangKelas = Ruang::with('programStudi')
        ->where('status', 'onprocess')
        ->paginate(15);
    

        return Inertia::render('Dekan/KelolaRuang', [
            'user' => $user,
            'roles' => $roles,
            'ruangkelas' => $ruangKelas,
            'dosen' => $dosen
        ]);
    }

    public function jadwalKuliah()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $dosen = Dosenpegawai::where('user_id', $user->user_id)->first();
    
    
        return Inertia::render('Dekan/JadwalKuliah', [
            'user' => $user,
            'roles' => $roles,
            'dosen' => $dosen
        ]);
    }
    

    public function setujui($id)
    {
        // Cari ruang kelas berdasarkan ID
        $ruangKelas = Ruang::findOrFail($id);
    
        // Ubah status menjadi 'Disetujui'
        $ruangKelas->status = 'Disetujui';
        
        // Simpan perubahan ke database
        $ruangKelas->save();
    
        // Alihkan kembali ke halaman yang sesuai dengan flash message
        return redirect()->route('dekan.kelolaruang')->with([
            'success' => true,
            'status' => $ruangKelas->status,
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
