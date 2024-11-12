<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        // Ambil data mahasiswa berdasarkan NIM yang cocok dengan nim_nip pada tabel users
        $mahasiswa = Mahasiswa::where('nim', $user->NIM_NIP)->first(); // Assuming 'nim' in Mahasiswa table and 'nim_nip' in Users table

        $doswal = User::where('id', $mahasiswa->wali_id )->first();
    
        // Kirim data ke frontend
        return Inertia::render('Mhs/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa, // Mengirim data mahasiswa
            'doswal' => $doswal
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
