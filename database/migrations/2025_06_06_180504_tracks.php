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
        Schema::create('tracks', function (Blueprint $table) {
    $table->id();
    $table->string('title')->unique();               // عنوان المسار
    // $table->string('slug')->unique();                // رابط ثابت للمسار
    $table->text('description')->nullable();         // وصف
    $table->string('image_url')->nullable();         // صورة غلاف
    $table->boolean('is_active')->default(true);     // هل المسار مفعل
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
