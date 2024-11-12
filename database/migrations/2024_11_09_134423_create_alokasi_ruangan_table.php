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
        Schema::create('alokasi_ruangan', function (Blueprint $table) {
            $table->id();
            $table->string('program_studi_id');
            $table->unsignedBigInteger('ruang_kelas_id');
            $table->enum('status', ['pending', 'onprocess', 'approved', 'rejected']);
            $table->timestamps();

            // Define foreign key constraints manually without `constrained`
            $table->foreign('program_studi_id')->references('kode_program_studi')->on('program_studi')->onDelete('cascade');
            $table->foreign('ruang_kelas_id')->references('id')->on('ruang_kelas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alokasi_ruangan');
    }
};
