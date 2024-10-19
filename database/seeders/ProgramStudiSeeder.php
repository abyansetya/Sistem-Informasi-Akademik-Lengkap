<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProgramStudi;

class ProgramStudiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Daftar program studi yang akan di-seed
        $programStudiList = [
            'Biologi', 
            'Fisika', 
            'Kimia', 
            'Matematika', 
            'Informatika', 
            'Bioteknologi'
        ];

        foreach ($programStudiList as $programStudi) {
            ProgramStudi::create([
                'kode_program_studi' => strtoupper(substr($programStudi, 0, 2)) . rand(100, 999), // Kode program contoh: IN123
                'nama_program_studi' => $programStudi,
                'fakultas' => 'Fakultas Sains dan Matematika',
            ]);
        }
    }
}
