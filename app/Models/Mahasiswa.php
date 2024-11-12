<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa'; // Nama tabel
    protected $primaryKey = 'nim'; // Primary key adalah nim, bukan id
    public $incrementing = false; // Non-incrementing key (karena nim adalah string)
    protected $keyType = 'string'; // Primary key bertipe string

    protected $fillable = [
        'nim',
        'angkatan',
        'semester',
        'sks',
        'ipk',
        'jumlah_sks',
        'wali_id'
    ];

    /**
     * Relasi ke model User sebagai wali dosen.
     */
    public function wali()
    {
        return $this->belongsTo(User::class, 'wali_id');
    }

    /**
     * Relasi ke model User menggunakan nim sebagai foreign key.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'nim', 'nim_nip');
    }

    public function prodi(){
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id');
    }
}
