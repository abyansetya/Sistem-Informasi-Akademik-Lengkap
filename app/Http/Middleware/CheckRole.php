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

        // Ambil pengguna yang sedang login
        $user = Auth::user();

        // Jika pengguna tidak memiliki role yang sesuai, arahkan ke halaman yang tidak diizinkan atau default
        if ($role && !$user->roles()->where('name', $role)->exists()) {
            abort(404);
        }

        // Jika pengguna memiliki role yang sesuai, izinkan untuk melanjutkan
        return $next($request);
    }
}
