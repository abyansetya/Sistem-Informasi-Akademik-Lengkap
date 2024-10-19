<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RuangKelas;

class RuangKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 22 rooms, 2 for each building A to K
        RuangKelas::factory()->count(6)->create();

    }
}
