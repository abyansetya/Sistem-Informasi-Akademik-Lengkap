<?php

namespace Database\Factories;

use App\Models\ProgramStudi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MataKuliah>
 */
class MataKuliahFactory extends Factory
{
    protected $model = \App\Models\MataKuliah::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_mata_kuliah' => $this->faker->unique()->lexify('MK???'), // Contoh: MK001, MK002, dll.
            'nama_mata_kuliah' => $this->faker->word() . ' ' . $this->faker->word(), // Contoh: 'Matematika Dasar'
            'sks' => $this->faker->numberBetween(2, 4), // Jumlah SKS antara 2 hingga 4
            'semester' => $this->faker->numberBetween(1, 8), // Semester antara 1 hingga 8
            'prioritas_semester' => $this->faker->numberBetween(1, 8), // Prioritas semester antara 1 hingga 8
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->kode_program_studi, // Mengambil kode_program_studi secara acak
        ];
    }
}
