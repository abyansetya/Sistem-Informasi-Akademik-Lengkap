<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->string('nim')->primary(); // Primary key nim
            $table->foreign('nim')
                  ->references('nim_nip')
                  ->on('users')
                  ->onDelete('cascade')
                  ->onUpdate('cascade'); // Foreign key dari users.nim_nip
            $table->unsignedBigInteger('wali_id')->nullable(); // Foreign key wali_id dari users.id
            $table->foreign('wali_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null')
                  ->onUpdate('cascade'); // Foreign key dari users.id
            $table->year('angkatan'); // Tahun angkatan
            $table->integer('semester'); // Semester
            $table->integer('sks'); // SKS saat ini
            $table->decimal('ipk', 3, 2); // IPK dengan 2 angka desimal
            $table->integer('jumlah_sks'); // Total jumlah SKS
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa');
    }
};