<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    use HasFactory;

    protected $table = 'mata_kuliah';

    protected $fillable = [
        'kode_mk', 
        'Name', 
        'sks', 
        'semester', 
        'prioritas_semester',
        'kode_prodi', 
        'created_at',
        'updated_at'
    ];

    /**
     * Relasi dengan model ProgramStudi.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'kode_prodi', 'kode_prodi');
    }

    public function dosen()
    {
        return $this->hasMany(DosenMk::class, 'kode_mk', 'kode_mk');
    }

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'kode_mk', 'kode_mk');
    }
}
