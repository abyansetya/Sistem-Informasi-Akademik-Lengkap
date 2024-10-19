<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuangKelas extends Model
{
    use HasFactory;

    // Jika nama tabel berbeda dengan default Laravel (plural dari nama model),
    // kamu perlu mendefinisikannya secara eksplisit. Karena tabelmu adalah `ruang_kelas`, tambahkan:
    protected $table = 'ruang_kelas';

    // Tentukan kolom yang boleh diisi menggunakan mass assignment
    protected $fillable = ['nama_ruang', 'gedung', 'kuota'];
}
