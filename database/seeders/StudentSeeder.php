<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample students with varied fitness levels
        Student::factory()->count(15)->create();
        
        // Create some specific examples for demonstration
        $specificStudents = [
            [
                'name' => 'Ahmad Fitri',
                'age' => 18,
                'height' => 175,
                'weight' => 65,
                'running_time' => 7.5,
                'sit_ups' => 45,
                'push_ups' => 30,
            ],
            [
                'name' => 'Siti Aminah',
                'age' => 17,
                'height' => 160,
                'weight' => 55,
                'running_time' => 9.2,
                'sit_ups' => 35,
                'push_ups' => 20,
            ],
            [
                'name' => 'Budi Santoso',
                'age' => 19,
                'height' => 180,
                'weight' => 85,
                'running_time' => 12.0,
                'sit_ups' => 25,
                'push_ups' => 15,
            ],
        ];
        
        foreach ($specificStudents as $studentData) {
            $tempStudent = new Student($studentData);
            $fitnessScore = $tempStudent->calculateFitnessScore();
            $fitnessLevel = Student::determineFitnessLevel($fitnessScore);
            
            $studentData['fitness_score'] = $fitnessScore;
            $studentData['fitness_level'] = $fitnessLevel;
            
            Student::create($studentData);
        }
    }
}