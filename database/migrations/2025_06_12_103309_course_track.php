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
        Schema::create('course_track', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('track_id')->constrained('Tracks')->onDelete('cascade'); 
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');                                                                             // عند حذف المستخدم، احذف الصف->onUpdate('cascade');   // عند تعديل الـ id، حدثه هنا أيض
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
