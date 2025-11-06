<?php

use App\Models\Employment;
use App\Models\Office;
use App\Models\Room;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Employment::class)->nullable();
            $table->foreignIdFor(Office::class)->nullable();
            $table->foreignIdFor(Room::class)->nullable();
            $table->char('code', 6)->nullable()->unique();
            $table->string('name');
            $table->string('phone');
            $table->string('avatar')->nullable();
            $table->string('invoice')->nullable();
            $table->boolean('paid')->default(false);
            $table->boolean('verified')->default(false);
            $table->boolean('admin')->default(false);
            $table->integer('capsize')->default(false);
            $table->date('arrive')->nullable();
            $table->date('depart')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
