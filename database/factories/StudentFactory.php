<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $age = $this->faker->numberBetween(16, 25);
        $height = $this->faker->numberBetween(150, 190);
        $weight = $this->faker->numberBetween(45, 90);
        $runningTime = $this->faker->randomFloat(2, 6, 18);
        $sitUps = $this->faker->numberBetween(10, 60);
        $pushUps = $this->faker->numberBetween(5, 40);
        
        // Create temporary student to calculate score
        $tempStudent = new Student([
            'height' => $height,
            'weight' => $weight,
            'running_time' => $runningTime,
            'sit_ups' => $sitUps,
            'push_ups' => $pushUps,
        ]);
        
        $fitnessScore = $tempStudent->calculateFitnessScore();
        $fitnessLevel = Student::determineFitnessLevel($fitnessScore);

        return [
            'name' => $this->faker->name(),
            'age' => $age,
            'height' => $height,
            'weight' => $weight,
            'running_time' => $runningTime,
            'sit_ups' => $sitUps,
            'push_ups' => $pushUps,
            'fitness_score' => $fitnessScore,
            'fitness_level' => $fitnessLevel,
        ];
    }
}