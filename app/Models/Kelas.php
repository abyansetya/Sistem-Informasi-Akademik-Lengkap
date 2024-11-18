<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'kelas';

    // Primary key
    protected $primaryKey = 'kelas_id';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'nama_kelas',
        'kuota',
    ];

    // Jika primary key bukan auto-increment
    public $incrementing = false;
    protected $keyType = 'string';

    // Relasi ke tabel Jadwal
    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'kelas', 'nama_kelas');
    }
}
