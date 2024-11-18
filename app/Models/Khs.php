<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Khs extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'khs';

    // Primary key
    protected $primaryKey = 'khs_id';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'irs_id', 
        'nilai_huruf', 
        'nilai_angka',
    ];

    // Jika primary key bukan auto-increment
    public $incrementing = false;
    protected $keyType = 'string';

    // Relasi dengan IRS
    public function irs()
    {
        return $this->belongsTo(Irs::class, 'irs_id', 'irs_id');
    }
}
