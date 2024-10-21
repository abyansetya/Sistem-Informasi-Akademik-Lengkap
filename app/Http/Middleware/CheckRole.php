<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next, $role = null)
    {
        // Pastikan pengguna sudah login
        if (!Auth::check()) {
            return redirect('/login'); // Arahkan ke halaman login jika belum login
        }
    
        // Ambil role yang tersimpan di session
        $roles = session('selected_role', 'default');
    
        // Jika pengguna tidak memiliki role yang sesuai, arahkan ke halaman yang tidak diizinkan atau default
        if ($role && $roles !== $role) {
            abort(404); // Atau gunakan abort(403) jika lebih sesuai
        }
    
        // Jika role sesuai, izinkan melanjutkan
        return $next($request);
    }
    
}
