<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat user dengan dua role (Dekan dan Doswal)
        // $user = User::factory()->create([
        //     'name' => 'mhs perwalian',
        //     'email' => 'mhsperwalian@example.com',
        //     'password' => Hash::make('password123'), // Password default
        //     'NIM_NIP' => '24000002', // NIP untuk Dekan atau Doswal
        //     'status' => 'active',
        //     'wali_id' => 14,
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);


        //Attach role 
        // $rolemhs = Role::where('name', 'mhs perwalian')->first();
        // if ($rolemhs) {
        //     $user->roles()->attach($rolemhs->id, [], 'user_roles');
        // }

        // // Attach role Doswal
        // $roleDoswal = Role::where('name', 'Doswal')->first();
        // if ($roleDoswal) {
        //     $user->roles()->attach($roleDoswal->id, [], 'user_roles');
        // }
        // $this->call(MataKuliahSeeder::class);
        Mahasiswa::create([
            'nim' => '24000001',
            'angkatan' => 2024,
            'semester' => 1,
            'sks' => 0,
            'ipk' => 0.00,
            'jumlah_sks' => 0,
            'wali_id' => 14
        ]);
    }
}
