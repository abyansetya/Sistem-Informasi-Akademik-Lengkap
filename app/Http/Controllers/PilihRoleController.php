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
        // Validasi input untuk memastikan 'selected_role' dikirim
        $request->validate([
            'selected_role' => 'required|string'
        ]);
    
        // Simpan role yang dipilih ke dalam session
        session(['selected_role' => $request->selected_role]);
    
        // Arahkan pengguna berdasarkan role yang dipilih
        switch ($request->selected_role) {
            case 'Mahasiswa':
                return redirect()->intended(route('mhs.index'));
            case 'Dekan':
                return redirect()->intended(route('dekan.index'));
            case 'Ketua Prodi':
                return redirect()->intended(route('kaprodi.index'));
            case 'Pembimbing Akademik':
                return redirect()->intended(route('doswal.index'));
            case 'Bagian Akademik':
                return redirect()->intended(route('bagianakademik.index'));
            default:
                return redirect('/'); // Jika role tidak ditemukan, arahkan ke halaman default
        }
    }    
}
