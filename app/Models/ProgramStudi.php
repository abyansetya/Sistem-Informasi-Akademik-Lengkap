<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    use HasFactory;

    protected $table = 'program_studi';

    protected $primaryKey = 'kode_program_studi'; // Menentukan primary key
    public $incrementing = false; // Menonaktifkan auto-increment jika primary key bukan integer
    protected $keyType = 'string'; // Tipe data primary key

    protected $fillable = [
        'kode_program_studi', 
        'nama_program_studi', 
        'fakultas'
    ];

    /**
     * Relasi dengan model MataKuliah.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mataKuliah()
    {
        return $this->hasMany(MataKuliah::class, 'program_studi_id', 'kode_program_studi');
    }

    /**
     * Relasi dengan model RuangKelas.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ruangKelas()
    {
        return $this->hasMany(RuangKelas::class, 'program_studi_id', 'kode_program_studi');
    }
}
