<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class KaprodiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        return Inertia::render('Kaprodi/Dashboard', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    public function dashboard()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        return Inertia::render('Kaprodi/Dashboard', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    public function jadwalKuliah()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        
        // Fetch data from the database
        $mataKuliah = \App\Models\MataKuliah::all(); // Adjust the model path as necessary
    
        return Inertia::render('Kaprodi/JadwalKuliah', [
            'user' => $user,
            'roles' => $roles,
            'mataKuliah' => $mataKuliah // Pass the fetched data to the view
        ]);
    }
    public function showJadwalDetail($id)
    {
        $mataKuliah = DB::table('mata_kuliah')->where('id', $id)->first();
    
        return Inertia::render('Kaprodi/JadwalDetail', [
            'mataKuliah' => $mataKuliah,
        ]);
    }
    public function mahasiswa()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        return Inertia::render('Kaprodi/Mahasiswa', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    public function monitoringMataKuliah()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        return Inertia::render('Kaprodi/Monitoring', [
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
