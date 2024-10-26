<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KaprodiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');

        // Kirim role ke frontend
        return Inertia::render('Kaprodi/Dashboard', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    public function dashboard()
    {
        return Inertia::render('Kaprodi/Dashboard', [
            // data untuk dashboard
        ]);
    }
    
    public function jadwalKuliah()
    {
        return Inertia::render('Kaprod/JadwalKuliah', [
            'user' => auth()->user(),
            'roles' => auth()->user()->roles
        ]);
    }
    
    public function mahasiswa()
    {
        return Inertia::render('Kaprodi/Mahasiswa', [
            // data untuk mahasiswa
        ]);
    }
    
    public function monitoringMataKuliah()
    {
        return Inertia::render('Kaprodi/MonitoringMataKuliah', [
            // data untuk monitoring mata kuliah
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
    public function update(Request $request, User $user)
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
