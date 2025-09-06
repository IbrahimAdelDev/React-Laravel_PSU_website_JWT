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
        Schema::create('teaching_staffs', function (Blueprint $table) {
            $table->id();
            $table->char('name');
            $table->char('gender');
            $table->unsignedBigInteger('dept_id');
            $table->foreign('dept_id')->references('id')->on('departments');
            $table->date('birth_date');
            $table->int('salary');
            $table->char('retirement_status');
            $table->char('email');
            $table->char('faculty_rank');
          //  $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_staffs');
    }
};
