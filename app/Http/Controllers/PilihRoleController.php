<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PilihRoleController extends Controller
{
    public function index()
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        
        // Ambil roles dari user
        $roles = $user->roles()->pluck('name'); // Ambil nama role pengguna
        
        // Arahkan ke halaman 'Pilih Role' dengan data roles
        return Inertia::render('PilihRole', [
            'roles' => $roles, // Mengirim roles ke view
        ]);
    }

    public function choose(Request $request)
    {
        // Simpan role yang dipilih ke dalam session
        $role = $request->input('role');
        Session::put('selected_role', $role);

        // Arahkan pengguna ke dashboard sesuai role yang dipilih
        switch ($role) {
            case 'Mahasiswa':
                return redirect()->route('mhs.index');
            case 'Dekan':
                return redirect()->route('dekan.index');
            case 'Ketua Prodi':
                return redirect()->route('kaprodi.index');
            case 'Pembimbing Akademik':
                return redirect()->route('doswal.index');
            case 'Bagian Akademik':
                return redirect()->route('bagianakademik.index');
            default:
                return redirect('/');
        }
    }
}
