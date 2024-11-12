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
        Schema::create('dosen_mk', function (Blueprint $table) {
            $table->id();
            $table->string('NIP');
            $table->string('kode_mata_kuliah');
            $table->integer('tahun');
            $table->integer('semester');

            $table->foreign('NIP')->references('NIM_NIP')->on('users')->onDelete('cascade');
            $table->foreign('kode_mata_kuliah')->references('kode_mata_kuliah')->on('mata_kuliah')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosen_mk');
    }
};
