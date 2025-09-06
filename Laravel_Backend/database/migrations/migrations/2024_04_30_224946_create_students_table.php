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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->char('name');
            $table->string('email');
            $table->char('gender');
            $table->char('birth_date');
            $table->string('GPA');
            $table->unsignedBigInteger('employee_id');
            $table->foreign('employee_id')->references('id')->on('employee');
           // $table->unsignedBigInteger('enrollment_id');
          //  $table->foreign('enrollment_id')->references('id')->on('enrollments');
            $table->string('years_of_study');
            $table->char('credits');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
