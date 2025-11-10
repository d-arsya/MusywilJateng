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
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('room');
            $table->date('date');
            $table->char('code', 10)->unique();
            $table->string('description')->nullable();
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('all')->default(true);
            $table->enum('status', ['Belum', 'Sedang', 'Telah'])->default('Belum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
