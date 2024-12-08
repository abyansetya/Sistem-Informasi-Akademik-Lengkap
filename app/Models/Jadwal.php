<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'jadwal';

    // Primary key
    protected $primaryKey = 'jadwal_id';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'hari',
        'jam_mulai',
        'jam_selesai',
        'kode_mk',
        'kelas',
        'nama_ruang',
        'kode_prodi',
        'status',
        'created_at',
        'updated_at',
    ];

    // Jika primary key bukan auto-increment
    public $incrementing = false;
    protected $keyType = 'string';

    // Relasi ke MataKuliah (opsional jika tabel mata_kuliah ada)
    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'kode_mk', 'kode_mk');
    }

    // Relasi ke Ruang (opsional jika tabel ruang ada)
    public function ruang()
    {
        return $this->belongsTo(Ruang::class, 'nama_ruang', 'nama_ruang');
    }

    public function irs()
    {
        return $this->hasMany(Irs::class, 'jadwal_id', 'jadwal_id');
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas', 'nama_kelas');
    }


}
