<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    use HasFactory;

    protected $table = 'program_studi';

    protected $primaryKey = 'prodi_id'; // Menentukan primary key
    public $incrementing = false; // Menonaktifkan auto-increment jika primary key bukan integer
    protected $keyType = 'string'; // Tipe data primary key

    protected $fillable = [
        'prodi_id',
        'kode_prodi', 
        'nama_prodi'
    ];

    /**
     * Relasi dengan model MataKuliah.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mataKuliah()
    {
        return $this->hasMany(MataKuliah::class, 'kode_prodi', 'kode_prodi');
    }

    /**
     * Relasi dengan model RuangKelas.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ruangKelas()
    {
        return $this->hasMany(Ruang::class, 'kode_prodi', 'kode_prodi');
    }


    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'kode_prodi', 'kode_prodi');
    }

    public function dosenPegawai()
    {
        return $this->hasMany(Dosenpegawai::class, 'kode_prodi', 'kode_prodi');
    }



}
