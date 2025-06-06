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
    Schema::create('courses', function (Blueprint $table) {
    $table->id();
    $table->string('course_name');
    $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
    $table->decimal('price', 8, 2)->default(0);
    $table->enum('level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
    $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
    $table->boolean('is_active')->default(true);
    $table->text('description')->nullable();
    $table->string('cover_image')->nullable();
    $table->string('category')->nullable(); // أو استخدم foreignId مع جدول categories
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
