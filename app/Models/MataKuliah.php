<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    use HasFactory;

    protected $table = 'mata_kuliah';

    protected $fillable = [
        'id',
        'kode_mata_kuliah', 
        'nama_mata_kuliah', 
        'sks', 
        'semester', 
        'prioritas_semester', 
        'program_studi_id'
    ];

    /**
     * Relasi dengan model ProgramStudi.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id', 'kode_program_studi');
    }
}
