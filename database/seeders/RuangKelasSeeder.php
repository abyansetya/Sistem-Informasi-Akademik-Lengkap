<?php

namespace Database\Seeders;

use App\Models\Ruang;
use Illuminate\Database\Seeder;


class RuangKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 22 rooms, 2 for each building A to K
        Ruang::factory()->count(6)->create();

    }
}
