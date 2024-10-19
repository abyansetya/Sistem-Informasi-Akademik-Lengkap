<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProgramStudi>
 */
class ProgramStudiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_program_studi' => $this->faker->unique()->regexify('[A-Z]{2}[0-9]{3}'), // Contoh kode: IN123
            'nama_program_studi' => $this->faker->randomElement([
                'Biologi', 
                'Fisika', 
                'Kimia', 
                'Matematika', 
                'Informatika', 
                'Bioteknologi'
            ]),
            'fakultas' => 'Fakultas Sains dan Matematika', // Tetap Fakultas Sains dan Matematika
        ];
    }
}
