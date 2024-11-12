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
        Schema::create('mata_kuliah', function (Blueprint $table) {
            $table->id();
            $table->string('kode_mata_kuliah')->unique();
            $table->string('nama_mata_kuliah');
            $table->integer('sks');
            $table->integer('semester'); // Kolom untuk semester
            $table->integer('prioritas_semester');
            $table->string('program_studi_id'); // Kolom foreign key berupa string
            $table->timestamps();

            // Definisikan foreign key dengan kolom string
            $table->foreign('program_studi_id')
                  ->references('kode_program_studi')
                  ->on('program_studi')
                  ->onDelete('cascade'); // Cascade delete jika program studi dihapus
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mata_kuliah');
    }
};
