<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekapPrestasi extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'rekap_prestasi';

    // Kolom yang dapat diisi
    protected $fillable = [
        'rekap_id',
        'NIM',
        'Semester',
        'Tahun_Ajaran',
        'keterangan',
        'SKS',
        'IP_Semester',
        'IPK',
        'created_at',
        'updated_at',
    ];

    // Jika primary key bukan auto-increment, tambahkan properti berikut
    protected $primaryKey = 'rekap_id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'NIM', 'NIM');
    }

}
