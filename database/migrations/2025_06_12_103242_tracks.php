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
        Schema::create('Tracks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 100);
            $table->string('subtitle', 100);
            $table->string('description', 400);
            $table->string('image')->nullable();
            $table->integer('course_count')->default(0);
            $table->foreignId('track_type')->constrained('course_track_type')->onDelete('cascade');                                                                               // عند حذف المستخدم، احذف الصف->onUpdate('cascade');   // عند تعديل الـ id، حدثه هنا أيضً
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
