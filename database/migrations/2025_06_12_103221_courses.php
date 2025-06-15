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
            $table->string('title');
            $table->string('subtitle');
            $table->text('description')->nullable();
            $table->integer('lesson_count')->default(0);
            $table->foreignId('Teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->foreignId('level_id')->constrained('course_level')->onDelete('cascade'); 
            $table->foreignId('course_type')->constrained('course_track_type')->onDelete('cascade');                                                                               // عند حذف المستخدم، احذف الصف->onUpdate('cascade');   // عند تعديل الـ id، حدثه هنا أيضًا
            $table->string('cover_image')->nullable();
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
