<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Student;

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
        
        // Fetch mata_kuliah data with the id field
        $mataKuliah = DB::table('mata_kuliah')->select('id', 'nama_mata_kuliah', 'sks', 'semester')->get();
    
        return Inertia::render('Kaprodi/JadwalKuliah', [
            'user' => $user,
            'roles' => $roles,
            'mataKuliah' => $mataKuliah,
        ]);
    }
    public function jadwalDetail($id)
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');

        $mataKuliah = DB::table('mata_kuliah')->where('id', $id)->first();
        
        return Inertia::render('Kaprodi/JadwalDetail', [
            'user' => $user,
            'roles' => $roles,
            'mataKuliah' => $mataKuliah,
        ]);
    }
    public function mahasiswa()
    {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
        $students = DB::table('students')->select('id', 'nama', 'nim', 'angkatan', 'status_irs')->get();

        return Inertia::render('Kaprodi/Mahasiswa', [
            'user' => $user,
            'roles' => $roles,
            'students' => $students,
        ]);
    }

    // Metode untuk menyetujui IRS mahasiswa berdasarkan ID
    public function acc($Studentid)
    {
        $student = Student::find($Studentid);
        if ($student) {
            $student->status_irs = $student->status_irs === 'Setuju' ? 'Belum Setuju' : 'Setuju';
            $student->save();
    
            return response()->json(['message' => 'Status berhasil diperbarui']);
        } else {
            return response()->json(['message' => 'Student tidak ditemukan'], 404);
        }
    }

    public function monitoring()
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