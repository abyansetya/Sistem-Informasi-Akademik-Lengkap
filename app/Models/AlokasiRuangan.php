<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlokasiRuangan extends Model
{
    use HasFactory;
    protected $fillable = [
        'program_studi_id',
        'ruang_kelas_id',
        'status',
    ];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    public function ruangKelas()
    {
        return $this->belongsTo(RuangKelas::class);
    }
}
