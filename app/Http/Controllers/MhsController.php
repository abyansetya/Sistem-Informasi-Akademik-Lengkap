<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Dosenpegawai;
use App\Models\Irs;
use App\Models\Jadwal;
use App\Models\Khs;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use App\Models\RekapPrestasi;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first(); // Assuming 'nim' in Mahasiswa table and 'nim_nip' in Users table
        $prodi = ProgramStudi::where('kode_prodi', $mahasiswa->kode_prodi)->first();
        $tahun_ajaran = TahunAjaran::where('status', 'Aktif')->firstOrFail();
       
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali )->first();
        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        // Periksa apakah tahun ajaran aktif ditemukan
        $rekapsmt = collect(); // Default nilai kosong
        if ($tahun_ajaran) {
            $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
                ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
                ->where('keterangan', $tahun_ajaran->keterangan)
                ->get();
        }
        // dd($rekapsmt);

            // Hitung IPK
        $ipData = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->whereNotNull('IP_Semester')
        ->get();

        $totalIp = $ipData->sum('IP_Semester');
        $jumlahSemester = $ipData->count();
        $ipk = $jumlahSemester > 0 ? round($totalIp / $jumlahSemester, 2) : null;

        //hitung sksk
        $sksData = RekapPrestasi::where('NIM', $mahasiswa->NIM)
        ->whereNotNull('IP_Semester')
        ->get();
        $sksk = $sksData->sum('SKS');
    
        // Kirim data ke frontend
        return Inertia::render('Mhs/Dashboard', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa, // Mengirim data mahasiswa
            'tahun_ajaran' => $tahun_ajaran,
            'prodi' => $prodi,
            'doswal' => $doswal,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt,
            'ipk' => $ipk,
            'sksk' => $sksk,
            'ipData' => $ipData
        ]);
    }

    public function IRS() {
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first();
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali)->first();
        $tahun_ajaran = TahunAjaran::where('status', 'Aktif')->firstOrFail();

        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        $rekapsmt = collect(); // Default nilai kosong
        if ($tahun_ajaran) {
            $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
                ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
                ->where('keterangan', $tahun_ajaran->keterangan)
                ->get();
        }
    
        $matakuliah = MataKuliah::where("kode_prodi", $mahasiswa->kode_prodi)->get();

        $irs = collect();
        if($tahun_ajaran){
            $irs = Irs::where("NIM", $mahasiswa->NIM)
            ->where('Tahun_Ajaran', $tahun_ajaran->tahun)
            ->where('keterangan', $tahun_ajaran->keterangan)
            ->get();
        }
    

        $jadwal = Jadwal::join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->leftJoin('dosen_mk', 'jadwal.kode_mk', '=', 'dosen_mk.kode_mk')
        ->leftJoin('dosen_pegawai', 'dosen_mk.NIP', '=', 'dosen_pegawai.NIP')
        ->leftJoin('irs', 'irs.jadwal_id', '=','jadwal.jadwal_id')
        ->select(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'jadwal.nama_ruang',
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name AS mata_kuliah_name',
            'mata_kuliah.sks',
            'mata_kuliah.semester',
            'irs.status_pengambilan',
            DB::raw("GROUP_CONCAT(dosen_pegawai.Name SEPARATOR ', ') AS dosen_names")
        )
        ->where('jadwal.kode_prodi', $mahasiswa->kode_prodi)
        ->groupBy(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'jadwal.nama_ruang',    
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name',
            'mata_kuliah.sks',
            'mata_kuliah.semester',
            'irs.status_pengambilan'
        )
        ->get();
        
    
        return Inertia::render('Mhs/IRS', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa,
            'doswal' => $doswal,
            'tahun_ajaran' => $tahun_ajaran,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt,
            'matakuliah' => $matakuliah,
            'jadwal' => $jadwal,
            'irs' => $irs
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

    private function getMaxSKSByIP($nim, $currentTahunAjaran, $currentKeterangan)
    {
        // Untuk semester genap, ambil IP dari semester ganjil di tahun ajaran yang sama
        $prevTahunAjaran = $currentTahunAjaran;
        $prevKeterangan = "Ganjil";

        // Ambil IP semester sebelumnya
        $previousIP = RekapPrestasi::where('NIM', $nim)
            ->where('Tahun_Ajaran', $prevTahunAjaran)
            ->where('keterangan', $prevKeterangan)
            ->first();

        if (!$previousIP) {
            // Jika tidak ada riwayat IP, berikan default maksimal
            return 24;
        }

        // Tentukan maksimal SKS berdasarkan IP
        $ipSemester = $previousIP->IP_Semester;
        
        if ($ipSemester >= 3.00) {
            return 24;
        } elseif ($ipSemester >= 2.50) {
            return 21;
        } elseif ($ipSemester >= 2.00) {
            return 18;
        } else {
            return 15;
        }
    }

    private function getTotalSKS($nim, $tahunAjaran, $keterangan)
    {
        return Irs::where('NIM', $nim)
            ->where('Tahun_Ajaran', $tahunAjaran)
            ->where('keterangan', $keterangan)
            ->join('jadwal', 'irs.jadwal_id', '=', 'jadwal.jadwal_id')
            ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->sum('mata_kuliah.sks');
    }

    public function getCurrentSKS(Request $request)
    {
        try {
            $nim = $request->input('NIM');
            $tahunAjaran = $request->input('Tahun_Ajaran');
            $keterangan = $request->input('keterangan');
            
            // Get total SKS for current semester
            $totalSKS = $this->getTotalSKS($nim, $tahunAjaran, $keterangan);
            
            // Get max SKS based on previous semester's IP
            $maxSKS = $this->getMaxSKSByIP($nim, $tahunAjaran, $keterangan);
            
            return response()->json([
                'total_sks' => (int)$totalSKS,
                'max_sks' => (int)$maxSKS,
                'remaining_sks' => (int)($maxSKS - $totalSKS)
            ]);
        } catch (\Exception $e) {
            Log::error('Error in getCurrentSKS:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Gagal mengambil informasi SKS',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'jadwal_id' => 'required|exists:jadwal,jadwal_id',
                'NIM' => 'required|exists:mahasiswa,NIM',
                'status' => 'required|string',
                'Tahun_Ajaran' => 'required|string',
                'keterangan' => 'required|string', // Changed to required since we need it
            ]);

             // Periksa apakah mata kuliah sudah ada di tabel khs
            // $currentKHS = Khs::where('irs_id', function($query) use ($validatedData) {
            //     $query->select('irs_id')
            //         ->from('irs')
            //         ->where('NIM', $validatedData['NIM'])
            //         ->where('Tahun_Ajaran', $validatedData['Tahun_Ajaran'])
            //         ->where('keterangan', $validatedData['keterangan'])
            //         ->whereHas('jadwal', function($q) use ($validatedData) {
            //             $q->where('kode_mk', $validatedData['jadwal_id']);
            //         });
            // })->first();

        // if ($currentKHS) {
        //     // Jika sudah ada di tabel khs, periksa nilai
        //     if ($currentKHS->nilai_huruf == 'C') {
        //         $status_pengambilan = 'PERBAIKAN';
        //     } elseif ($currentKHS->nilai_huruf == 'D' || $currentKHS->nilai_huruf == 'E') {
        //         $status_pengambilan = 'MENGULANG';
        //     } else {
        //         $status_pengambilan = 'BARU';
        //     }
        // } else {
        //     $status_pengambilan = 'BARU';
        // }

            // Get maksimal SKS berdasarkan IP semester sebelumnya
            $maxSKS = $this->getMaxSKSByIP(
                $validatedData['NIM'], 
                $validatedData['Tahun_Ajaran'], 
                $validatedData['keterangan']
            );

            // Get the jadwal details for the current schedule
            $currentJadwal = Jadwal::with('matakuliah') // Eager load matakuliah relation
                ->findOrFail($validatedData['jadwal_id']);

            // Hitung total SKS yang sudah diambil untuk semester ini
            $currentTotalSKS = $this->getTotalSKS(
                $validatedData['NIM'],
                $validatedData['Tahun_Ajaran'],
                $validatedData['keterangan']
            );

            // Hitung SKS yang akan ditambahkan
            $newSKS = $currentJadwal->matakuliah->sks ?? 0;

            // Validasi total SKS berdasarkan IP
            if ($currentTotalSKS + $newSKS > $maxSKS) {
                throw ValidationException::withMessages([
                    'jadwal_id' => ["Total SKS melebihi batas maksimal ($maxSKS SKS) berdasarkan IP semester sebelumnya"]
                ]);
            }

            // Check for duplicate course entry (same kode_mk) in IRS for the current semester
            $duplicateCourse = Irs::where('NIM', $validatedData['NIM'])
                ->where('Tahun_Ajaran', $validatedData['Tahun_Ajaran'])
                ->where('keterangan', $validatedData['keterangan'])
                ->whereHas('jadwal', function ($query) use ($currentJadwal) {
                    $query->where('kode_mk', $currentJadwal->kode_mk);
                })
                ->exists();

            if ($duplicateCourse) {
                throw ValidationException::withMessages([
                    'jadwal_id' => ['Mata kuliah ini sudah ada dalam IRS Anda untuk semester ini.']
                ]);
            }

            // Check for time conflicts with other courses ON THE SAME DAY in the current semester
            $conflictingIrs = Irs::where('NIM', $validatedData['NIM'])
                ->where('Tahun_Ajaran', $validatedData['Tahun_Ajaran'])
                ->where('keterangan', $validatedData['keterangan'])
                ->whereHas('jadwal', function ($query) use ($currentJadwal) {
                    $query->where('hari', $currentJadwal->hari)
                        ->where(function ($q) use ($currentJadwal) {
                            $q->where(function ($subQ) use ($currentJadwal) {
                                // New schedule starts during an existing schedule
                                $subQ->where('jam_mulai', '<=', $currentJadwal->jam_mulai)
                                    ->where('jam_selesai', '>', $currentJadwal->jam_mulai);
                            })->orWhere(function ($subQ) use ($currentJadwal) {
                                // New schedule ends during an existing schedule
                                $subQ->where('jam_mulai', '<', $currentJadwal->jam_selesai)
                                    ->where('jam_selesai', '>=', $currentJadwal->jam_selesai);
                            })->orWhere(function ($subQ) use ($currentJadwal) {
                                // New schedule completely encompasses an existing schedule
                                $subQ->where('jam_mulai', '>=', $currentJadwal->jam_mulai)
                                    ->where('jam_selesai', '<=', $currentJadwal->jam_selesai);
                            });
                        });
                })
                ->exists();

            if ($conflictingIrs) {
                throw ValidationException::withMessages([
                    'jadwal_id' => ['Terdapat jadwal yang bertabrakan pada hari yang sama.']
                ]);
            }

            // If no conflicts, check for existing onprocess IRS records
            $existingOnProcessIRS = Irs::where('NIM', $validatedData['NIM'])
                ->where('Tahun_Ajaran', $validatedData['Tahun_Ajaran'])
                ->where('keterangan', $validatedData['keterangan'])
                ->where('status', 'onprocess')
                ->exists();

            if ($existingOnProcessIRS) {
                // Change status of existing onprocess records to pending
                Irs::where('NIM', $validatedData['NIM'])
                    ->where('Tahun_Ajaran', $validatedData['Tahun_Ajaran'])
                    ->where('keterangan', $validatedData['keterangan'])
                    ->where('status', 'onprocess')
                    ->update(['status' => 'pending']);
            }

            // Create IRS entry if no conflicts
            $irs = Irs::create($validatedData);

            return response()->json([
                'message' => 'Jadwal berhasil ditambahkan ke IRS',
                'data' => $irs
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in store IRS:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Gagal menambahkan jadwal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteIRS($id)
    {
        try {
            $irs = IRS::findOrFail($id);
            
            // Get NIM, Tahun_Ajaran, and keterangan before deleting
            $nim = $irs->NIM;
            $tahunAjaran = $irs->Tahun_Ajaran;
            $keterangan = $irs->keterangan;

            $irs->delete();
            
            // Check if any remaining IRS records are onprocess
            $existingOnProcessIRS = Irs::where('NIM', $nim)
                ->where('Tahun_Ajaran', $tahunAjaran)
                ->where('keterangan', $keterangan)
                ->where('status', 'onprocess')
                ->exists();

            if ($existingOnProcessIRS) {
                // Change status of all remaining records to pending
                Irs::where('NIM', $nim)
                    ->where('Tahun_Ajaran', $tahunAjaran)
                    ->where('keterangan', $keterangan)
                    ->update(['status' => 'pending']);
            }

            return response()->json(['message' => 'IRS berhasil dihapus']);
            
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghapus IRS'], 500);
        }
    }

    public function updateAllIRSStatus(Request $request)
    {
        $nim = $request->input('nim');
        $tahunAjaran = $request->input('tahunAjaran');
        $keterangan = $request->input('keterangan');
        
        Irs::where('NIM', $nim)
            ->where('Tahun_Ajaran', $tahunAjaran)
            ->where('keterangan', $keterangan)
            ->update(['status' => 'onprocess']);

        return redirect()->back()->with('success', 'All IRS records updated successfully.');
    }

    public function downloadIRS($semester, $NIM, $Tahun_Ajaran, $keterangan)
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('NIM', $NIM )->first();
    
        $irs = Irs::join('jadwal', 'irs.jadwal_id', '=', 'jadwal.jadwal_id')
            ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->leftJoin('dosen_mk', 'jadwal.kode_mk', '=', 'dosen_mk.kode_mk')
            ->leftJoin('dosen_pegawai', 'dosen_mk.NIP', '=', 'dosen_pegawai.NIP')
            ->where('irs.NIM', $NIM)
            ->where('irs.Tahun_Ajaran', $Tahun_Ajaran)
            ->where('irs.keterangan', $keterangan)
            ->select(
                'irs.*',  // Ambil semua kolom dari tabel IRS
                'jadwal.jadwal_id',
                'jadwal.hari',
                'jadwal.jam_mulai',
                'jadwal.jam_selesai',
                'jadwal.kelas',
                'mata_kuliah.kode_mk',
                'mata_kuliah.Name AS mata_kuliah_name',
                'mata_kuliah.sks',
                'mata_kuliah.semester',
                DB::raw("GROUP_CONCAT(dosen_pegawai.Name SEPARATOR ', ') AS dosen_names")
            )
            ->groupBy(
                'irs.irs_id',  // Kolom dari IRS
                'irs.NIM',
                'irs.Tahun_Ajaran',
                'irs.keterangan',
                'irs.status_pengambilan',
                'irs.jadwal_id',  // Kolom dari IRS
                'irs.status',  // Kolom yang menyebabkan error, tambahkan ke GROUP BY
                'irs.created_at',
                'irs.updated_at',
                'jadwal.jadwal_id',  // Kolom dari Jadwal
                'jadwal.hari',
                'jadwal.jam_mulai',
                'jadwal.jam_selesai',
                'jadwal.kelas',
                'mata_kuliah.kode_mk',
                'mata_kuliah.Name',
                'mata_kuliah.sks',
                'mata_kuliah.semester'
            )
            ->get();
    
        $pdf = PDF::loadView('pdf.irs', compact('mahasiswa', 'irs', 'semester'));
        return $pdf->download("IRS_Semester_$semester.pdf");
    }
    
    
    public function KHS(){
        // Ambil role pengguna
        $user = Auth::user();
        $roles = session('selected_role', 'default');
    
        $mahasiswa = Mahasiswa::where('user_id', $user->user_id)->first();
        $doswal = Dosenpegawai::where('NIP', $mahasiswa->NIP_wali)->first();
        $rekapALL = RekapPrestasi::where('NIM', $mahasiswa->NIM)->get();
        $rekapsmt = RekapPrestasi::where('NIM', $mahasiswa->NIM)
            ->where('Tahun_Ajaran', '2024/2025')
            ->where('keterangan', 'Genap')
            ->get();
    
        $matakuliah = MataKuliah::where("kode_prodi", $mahasiswa->kode_prodi)->get();
        $irs = Irs::where("NIM", $mahasiswa->NIM)
            ->where('Tahun_Ajaran', '2024/2025')
            ->where('keterangan', 'Genap')
            ->get();
    

        $jadwal = Jadwal::join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->leftJoin('dosen_mk', 'jadwal.kode_mk', '=', 'dosen_mk.kode_mk')
        ->leftJoin('dosen_pegawai', 'dosen_mk.NIP', '=', 'dosen_pegawai.NIP')
        ->select(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name AS mata_kuliah_name',
            'mata_kuliah.sks',
            'mata_kuliah.semester',
            DB::raw("GROUP_CONCAT(dosen_pegawai.Name SEPARATOR ', ') AS dosen_names")
        )
        ->where('jadwal.kode_prodi', $mahasiswa->kode_prodi)
        ->groupBy(
            'jadwal.jadwal_id',
            'jadwal.hari',
            'jadwal.jam_mulai',
            'jadwal.jam_selesai',
            'jadwal.kelas',
            'mata_kuliah.kode_mk',
            'mata_kuliah.Name',
            'mata_kuliah.sks',
            'mata_kuliah.semester'
        )
        ->get();
        
    
        return Inertia::render('Mhs/KHS', [
            'user' => $user,
            'roles' => $roles,
            'mahasiswa' => $mahasiswa,
            'doswal' => $doswal,
            'rekapAll' => $rekapALL,
            'rekapsmt' => $rekapsmt,
            'matakuliah' => $matakuliah,
            'jadwal' => $jadwal,
            'irs' => $irs
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