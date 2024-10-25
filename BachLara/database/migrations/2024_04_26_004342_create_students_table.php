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
            $table->id();//primary
            $table->char('name',60);
            $table->char('gender',60)->default('');
            $table->char('birth_date',60)->default('');
            $table->char('dept_id',60)->default('');
            $table->char('GPA',60)->default('');
            $table->char('email',60);
            $table->char('years_of_study',60)->default('');
            $table->char('credits',60)->default('');
            $table->string('password');
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
