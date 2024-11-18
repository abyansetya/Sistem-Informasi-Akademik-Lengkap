<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosenpegawai extends Model
{
    use HasFactory;

    protected $table = 'dosen_pegawai'; // Nama tabel
    protected $primaryKey = 'NIP'; // Primary key adalah nim, bukan id
    public $incrementing = false; // Non-incrementing key (karena nim adalah string)
    protected $keyType = 'string'; // Primary key bertipe string

    protected $fillable = [
        'NIP',
        'Name',
        'no_tekp',
        'kode_prodi',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function prodi(){
        return $this->belongsTo(ProgramStudi::class, 'kode_prodi', 'kode_prodi');
    }

    public function mataKuliah()
    {
        return $this->hasMany(DosenMk::class, 'NIP', 'NIP');
    }

}
