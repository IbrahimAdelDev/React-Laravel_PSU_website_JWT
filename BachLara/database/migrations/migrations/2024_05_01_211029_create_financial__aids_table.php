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
        Schema::create('financial__aids', function (Blueprint $table) {
            $table->id();
            $table->char('Eligibility');
            $table->char('Scholarships');
            $table->date('Date');
            $table->char('permission_num');
            $table->foreign('permission_num')->references('permission_num')->on('financial_reports');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial__aids');
    }
};
