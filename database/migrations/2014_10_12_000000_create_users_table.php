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
       Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('f_name');
    $table->string('l_name')->nullable();
    $table->string('email')->unique();
    $table->string('password');
    $table->date('birth_date')->nullable();
    $table->string('phone_number', 20)->nullable();
    $table->unsignedTinyInteger('role')->default(3);
    $table->boolean('isblocked')->default(false); // 1=admin, 2=teacher, 3=student
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
