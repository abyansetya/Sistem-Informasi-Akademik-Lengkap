<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

        // Kirim role ke frontend
        return Inertia::render('Mhs/Dashboard', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    

    /**
     * Display Mahasiswa Perwalian page.
     */
    public function mahasiswaPerwalian()
    {
        try {
            $mahasiswa = Mahasiswa::with(['user'])->get();
            Log::info('Raw mahasiswa data:', ['mahasiswa' => $mahasiswa->toArray()]);
            
            $formattedData = $mahasiswa->map(function ($mhs) {
                return [
                    'nama' => $mhs->user->name,
                    'nim' => $mhs->nim,
                    'angkatan' => $mhs->angkatan,
                    'semester' => $mhs->semester,
                    'sks' => $mhs->sks,
                    'ipk' => $mhs->ipk,
                    'jumlah_sks' => $mhs->jumlah_sks,
                    'status' => $mhs->status ?? 'Aktif'
                ];
            });
            
            Log::info('Formatted mahasiswa data:', ['mahasiswa' => $formattedData->toArray()]);

            return Inertia::render('mahasiswaPerwalian', [
                'mahasiswa' => $formattedData,
                'user' => Auth::user(),
                'roles' => session('selected_role', 'default')
            ]);

        } catch (\Exception $e) {
            Log::error('Error in mahasiswaPerwalian:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return Inertia::render('mahasiswaPerwalian', [
                'mahasiswa' => [],
                'user' => Auth::user(),
                'roles' => session('selected_role', 'default')
            ]);
        }
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