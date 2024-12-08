<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DosenMk extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'dosen_mk';

    // Primary key
    protected $primaryKey = 'dosen_mk_id';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'dosen_mk_id',
        'nama_dosen',
        'NIP',
        'kode_mk',
        'created_at',
        'updated_at',
    ];

    // Jika primary key bukan auto-increment
    public $incrementing = false;
    protected $keyType = 'integer';

    public function dosen()
    {
        return $this->belongsTo(Dosenpegawai::class, 'NIP', 'NIP');
    }

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'kode_mk', 'kode_mk');
    }

    
}
