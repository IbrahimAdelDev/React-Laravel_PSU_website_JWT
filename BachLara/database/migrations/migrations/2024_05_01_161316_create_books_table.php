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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('author');
            $table->string('title');
            $table->char('category_id');
            $table->foreign('category-id')->references('id')->on('category');
            $table->char('library_id');
            $table->foreign('library_id')->references('id')->on('library');
            $table->char('student_id');
            $table->foreign('student_id')->references('id')->on('student');
            $table->date('borrow_date');
            $table->date('return_date');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
