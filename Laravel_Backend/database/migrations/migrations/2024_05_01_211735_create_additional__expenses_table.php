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
        Schema::create('additional__expenses', function (Blueprint $table) {
            $table->id();
            $table->char('Medical_Services');
            $table->char('Special_Course');
            $table->char('Student_Club');
            $table->char('Student_Union');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional__expenses');
    }
};
