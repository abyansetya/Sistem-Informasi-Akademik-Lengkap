<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $roles = DB::table('roles')
                    ->join('user_roles', 'roles.role_id', '=', 'user_roles.role_id')
                    ->where('user_roles.user_id', '=', $user->user_id)
                    ->pluck('roles.name');
        

        if($roles->count() > 1){
            return redirect()->intended(route('pilihrole.index'));
        }
    
        // Jika hanya ada 1 role, simpan role ke dalam session
        $selectedRole = $roles->first();
        session(['selected_role' => $selectedRole]);
        // Cek role dan arahkan sesuai
        if ($selectedRole === 'Mahasiswa') {
            return redirect()->intended(route('mhs.index')); 
        } elseif ($selectedRole === 'Dekan') {
            return redirect()->intended(route('dekan.index')); 
        } elseif ($selectedRole === 'Ketua Prodi') {
            return redirect()->intended(route('kaprodi.index'));
        } elseif ($selectedRole === 'Pembimbing Akademik') {
            return redirect()->intended(route('doswal.index')); 
        } elseif ($selectedRole === 'Bagian Akademik') {
            return redirect()->intended(route('bagianakademik.index')); 
        }

        // Jika tidak ada role yang sesuai, arahkan ke halaman default
        // return redirect('/');
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
