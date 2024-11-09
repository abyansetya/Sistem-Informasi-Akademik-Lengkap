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
            // Define program_studi_id as a string and add a foreign key constraint to kode_program_studi
            $table->string('program_studi_id');
            $table->foreign('program_studi_id')
                  ->references('kode_program_studi')
                  ->on('program_studi')
                  ->onDelete('cascade');
            $table->foreignId('ruang_kelas_id')->constrained("ruang_kelas")->onDelete('cascade');
            $table->enum('status', ['pending', 'onprocess', 'approved', 'rejected']);
            $table->timestamps();
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
