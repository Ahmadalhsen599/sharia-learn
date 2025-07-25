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
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    $table->id();
    $table->string('f_name');
    $table->string('l_name')->nullable();
    $table->string('email')->unique();
    $table->string('password');
    $table->date('birth_date')->nullable();
    $table->string('phone_number', 20)->nullable();
    $table->foreignId('role_id')->constrained('roles')->onDelete('cascade')->default(3);
   $table->boolean('isblocked')->default(0);
    $table->timestamps();
});
   DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
