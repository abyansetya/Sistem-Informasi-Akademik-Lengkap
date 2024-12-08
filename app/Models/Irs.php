<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Irs extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'irs';

    // Primary key
    protected $primaryKey = 'irs_id';

    // Kolom yang dapat diisi
    protected $fillable = [
        'jadwal_id', 
        'NIM', 
        'status', 
        'Tahun_Ajaran', 
        'keterangan',
        'status_pengambilan'
    ];

    // Jika primary key bukan auto-increment
    public $incrementing = false;
    protected $keyType = 'string';

    // Relasi ke tabel Jadwal
    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'jadwal_id', 'jadwal_id');
    }

    // Relasi ke tabel Mahasiswa
    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'nim', 'nim');
    }

    public function khs()
    {
        return $this->hasMany(Khs::class, 'irs_id', 'irs_id');
    }
}