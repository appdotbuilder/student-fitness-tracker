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
            $table->string('name');
            $table->integer('age');
            $table->decimal('height', 5, 2)->comment('Height in cm');
            $table->decimal('weight', 5, 2)->comment('Weight in kg');
            $table->decimal('running_time', 6, 2)->comment('Running time in minutes');
            $table->integer('sit_ups')->comment('Number of sit-ups completed');
            $table->integer('push_ups')->comment('Number of push-ups completed');
            $table->decimal('fitness_score', 5, 2)->comment('Calculated fitness score');
            $table->enum('fitness_level', ['Baik', 'Cukup', 'Kurang'])->comment('Fitness level category');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('fitness_level');
            $table->index(['fitness_level', 'fitness_score']);
            $table->index('created_at');
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