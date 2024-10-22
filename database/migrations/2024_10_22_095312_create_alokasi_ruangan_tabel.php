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
        Schema::create('alokasi_ruangan_tabel', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_studi_id')->constrained("program_studi")->onDelete('cascade');
            $table->foreignId('ruang_kelas_id')->constrained("ruang_kelas")->onDelete('cascade');
            // $table->string('program_studi_id'); // Menggunakan string untuk primary key dari program_studi
            // $table->string('ruang_kelas_id');   // Referensi ke tabel Ruang Kelas
            $table->enum('status', ['pending', 'onprocess', 'approved', 'rejected'])->default('pending'); // Status alokasi
            $table->timestamps();

            // Foreign Key Constraints
            // $table->foreign('program_studi_id')->references('kode_program_studi')->on('program_studi')->onDelete('cascade');
            // $table->foreign('ruang_kelas_id')->references('id')->on('ruang_kelas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alokasi_ruangan_tabel');
    }
};
