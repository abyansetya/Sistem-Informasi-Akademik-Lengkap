<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
    
        // Cek role pengguna dan arahkan ke dashboard yang sesuai
        $user = Auth::user();
        $roles = $user->roles()->pluck('name'); // Ambil nama role pengguna

        if($roles->count() > 1){
            return redirect()->intended(route('pilihrole.index'));
        }
    
        if ($roles->contains('Mahasiswa')) {
            return redirect()->intended(route('mhs.index')); // Mengarahkan ke index MhsController
        } elseif ($roles->contains('Dekan')) {
            return redirect()->intended(route('dekan.index')); // Gantilah ini dengan nama rute yang sesuai untuk Dekan
        } elseif ($roles->contains('Ketua Prodi')){
            return redirect()->intended(route('kaprodi.index'));
        }elseif ($roles->contains('Pembimbing Akademik')) {
            return redirect()->intended(route('doswal.index')); // Mengarahkan ke index Pembimbing Akademik
        } elseif ($roles->contains('Bagian Akademik')) {
            return redirect()->intended(route('bagianakademik.index')); // Mengarahkan ke index Bagian Akademik
        }
    
        // Jika tidak ada role yang sesuai, arahkan ke halaman default
        return redirect('/'); // Halaman default
    }
    
    

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
