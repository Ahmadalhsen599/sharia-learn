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
        Schema::create('topics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('topic_title');
            $table->text('topic_description')->nullable();
            $table->boolean('topic_status')->default(false); // نشر أو لا
            $table->integer('topic_order')->default(0);
            $table->unsignedBigInteger('course_id'); // FK to courses table
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
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
