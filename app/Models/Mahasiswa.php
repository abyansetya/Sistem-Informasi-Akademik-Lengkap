<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa'; // Nama tabel
    protected $primaryKey = 'NIM'; // Primary key adalah nim, bukan id
    public $incrementing = false; // Non-incrementing key (karena nim adalah string)
    protected $keyType = 'string'; // Primary key bertipe string

    protected $fillable = [
        'NIM',
        'Name',
        'No_telp',
        'NIP_wali',
        'kode_prodi',
    ];

    /**
     * Relasi ke model User sebagai wali dosen.
     */
    public function wali()
    {
        return $this->belongsTo(Dosenpegawai::class, 'NIP_wali', 'NIP');
    }

    /**
     * Relasi ke model User menggunakan nim sebagai foreign key.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function prodi(){
        return $this->belongsTo(ProgramStudi::class, 'kode_prodi', 'kode_prodi');
    }

    public function rekapPrestasi()
    {
        return $this->hasMany(RekapPrestasi::class, 'NIM', 'NIM');
    }

    public function irs()
    {
        return $this->hasMany(Irs::class, 'NIM', 'NIM');
    }

}
