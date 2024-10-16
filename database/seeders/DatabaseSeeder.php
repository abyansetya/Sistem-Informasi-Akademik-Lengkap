<?php

namespace Database\Seeders;

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
        $user = User::factory()->create([
            'name' => 'Dekan Doswal',
            'email' => 'dekandoswal@example.com',
            'password' => Hash::make('password123'), // Password default
            'NIM_NIP' => '19700005', // NIP untuk Dekan atau Doswal
            'status' => 'active',
            'wali_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Attach role Dekan
        $roleDekan = Role::where('name', 'Dekan')->first();
        if ($roleDekan) {
            $user->roles()->attach($roleDekan->id, [], 'user_roles');
        }

        // Attach role Doswal
        $roleDoswal = Role::where('name', 'Doswal')->first();
        if ($roleDoswal) {
            $user->roles()->attach($roleDoswal->id, [], 'user_roles');
        }
    }
}
