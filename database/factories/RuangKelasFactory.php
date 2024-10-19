<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RuangKelas>
 */
class RuangKelasFactory extends Factory
{
    // Static array untuk menyimpan ruang kelas yang belum digunakan
    protected static $ruangKelasAvailable = ['101', '102', '201', '202', '301', '302'];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Set gedung hanya 'A'
        $gedung = 'K';

        // Pilih salah satu ruang kelas dari daftar yang tersedia dan hapus setelah dipilih
        $namaRuang = array_shift(self::$ruangKelasAvailable);
        
        // Pastikan factory tidak dibuat jika ruang kelas sudah habis
        if (!$namaRuang) {
            throw new \Exception("Semua ruang kelas sudah digunakan.");
        }

        return [
            'nama_ruang' => $gedung . $namaRuang,
            'gedung' => $gedung,
            'kuota' => $this->faker->numberBetween(40, 50), // random kuota antara 40 dan 50
        ];
    }
}
