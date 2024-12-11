<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruang extends Model
{
    use HasFactory;

    // Jika nama tabel berbeda dengan default Laravel (plural dari nama model),
    // kamu perlu mendefinisikannya secara eksplisit. Karena tabelmu adalah `ruang_kelas`, tambahkan:
    protected $table = 'ruang';


    // Tentukan kolom yang boleh diisi menggunakan mass assignment
    protected $fillable = ['nama_ruang', 'gedung', 'kuota', 'status', 'kode_prodi'];


    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'kode_prodi', 'kode_prodi');
    }

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'nama_ruang', 'nama_ruang');
    }
    

}
