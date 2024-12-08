<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Ruang;
use Illuminate\Http\Request;

class ChartDataController extends Controller
{
    public function persetujuanRuang()
    {
        // Mengambil jumlah ruang berdasarkan status
        $data = [
            'Disetujui' => Ruang::where('status', 'approved')->count(),
            'Ditolak' => Ruang::where('status', 'rejected')->count(),
            'Menunggu' => Ruang::where('status', 'onprocess')->count(),
        ];

        // Mengembalikan data dalam format JSON
        return response()->json([
            'dataPersetujuanDekan' => [ 
                ['name' => 'Disetujui', 'value' => $data['Disetujui']],
                ['name' => 'Ditolak', 'value' => $data['Ditolak']],
                ['name' => 'Menunggu', 'value' => $data['Menunggu']],
            ],
        ]);
    }

    public function persetujuanJadwal()
    {
        // Mengambil jumlah ruang berdasarkan status
        $data = [
            'Disetujui' => Jadwal::where('status', 'approved')->count(),
            'Ditolak' => Jadwal::where('status', 'rejected')->count(),
            'Menunggu' => Jadwal::where('status', 'onprocess')->count(),
        ];

        // Mengembalikan data dalam format JSON
        return response()->json([
            'dataPersetujuanJadwal' => [ 
                ['name' => 'Disetujui', 'value' => $data['Disetujui']],
                ['name' => 'Ditolak', 'value' => $data['Ditolak']],
                ['name' => 'Menunggu', 'value' => $data['Menunggu']],
            ],
        ]);
    }

    public function progressRuang(){
        $data = [
            'Done' => Ruang::whereIn('status', ['onprocess', 'approved', 'rejected'])->count(),
            'Notyet' => Ruang::where('status', 'pending')->count(),
        ];

        return response()->json([
            'dataProgressRuang' => [ 
                ['name' => 'Sudah diinput', 'value' => $data['Done']],
                ['name' => 'Belum diinput', 'value' => $data['Notyet']],
         
            ],
        ]);
    }

    public function progressJadwal(){
        $data = [
            'Done' => Jadwal::whereIn('status', ['onprocess', 'approved', 'rejected'])->count(),
            'Notyet' => Jadwal::where('status', 'pending')->count(),
        ];

        return response()->json([
            'dataProgressJadwal' => [ 
                ['name' => 'Sudah diinput', 'value' => $data['Done']],
                ['name' => 'Belum diinput', 'value' => $data['Notyet']],
         
            ],
        ]);
    }

}
