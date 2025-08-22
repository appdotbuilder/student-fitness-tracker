<?php

use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can view fitness tracker page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) =>
        $page->component('welcome')
            ->has('students')
            ->has('stats')
    );
});

test('can create student fitness record', function () {
    $studentData = [
        'name' => 'John Doe',
        'age' => 18,
        'height' => 175,
        'weight' => 70,
        'running_time' => 8.5,
        'sit_ups' => 40,
        'push_ups' => 25,
    ];

    $response = $this->post('/students', $studentData);

    $response->assertRedirect('/');
    $this->assertDatabaseHas('students', [
        'name' => 'John Doe',
        'age' => 18,
    ]);

    $student = Student::where('name', 'John Doe')->first();
    expect($student->fitness_score)->not->toBeNull();
    expect($student->fitness_level)->not->toBeNull();
    expect($student->fitness_level)->toBeIn(['Baik', 'Cukup', 'Kurang']);
});

test('fitness score calculation', function () {
    $student = new Student([
        'height' => 175,
        'weight' => 70,
        'running_time' => 8.0,
        'sit_ups' => 45,
        'push_ups' => 30,
    ]);

    $score = $student->calculateFitnessScore();
    
    expect($score)->toBeFloat();
    expect($score)->toBeGreaterThanOrEqual(0);
    expect($score)->toBeLessThanOrEqual(100);
});

test('fitness level determination', function () {
    expect(Student::determineFitnessLevel(85))->toBe('Baik');
    expect(Student::determineFitnessLevel(65))->toBe('Cukup');
    expect(Student::determineFitnessLevel(45))->toBe('Kurang');
});

test('bmi calculation', function () {
    $student = Student::factory()->create([
        'height' => 175,
        'weight' => 70,
    ]);

    $expectedBmi = round(70 / (1.75 * 1.75), 2);
    expect($student->bmi)->toBe($expectedBmi);
});

test('can delete student record', function () {
    $student = Student::factory()->create();

    $response = $this->delete("/students/{$student->id}");

    $response->assertRedirect('/');
    $this->assertDatabaseMissing('students', ['id' => $student->id]);
});

test('form validation', function () {
    $response = $this->post('/students', [
        'name' => '',
        'age' => 5, // Too young
        'height' => 50, // Too short
        'weight' => 20, // Too light
        'running_time' => 2, // Too fast
        'sit_ups' => -5, // Negative
        'push_ups' => 150, // Too many
    ]);

    $response->assertSessionHasErrors([
        'name',
        'age',
        'height',
        'weight',
        'running_time',
        'sit_ups',
        'push_ups',
    ]);
});

test('statistics calculation', function () {
    // Create students with known fitness levels
    Student::factory()->create(['fitness_level' => 'Baik', 'fitness_score' => 85]);
    Student::factory()->create(['fitness_level' => 'Baik', 'fitness_score' => 90]);
    Student::factory()->create(['fitness_level' => 'Cukup', 'fitness_score' => 65]);
    Student::factory()->create(['fitness_level' => 'Kurang', 'fitness_score' => 45]);

    $response = $this->get('/');

    $response->assertInertia(fn ($page) =>
        $page->has('stats', fn ($stats) =>
            $stats->where('total', 4)
                  ->where('baik', 2)
                  ->where('cukup', 1)
                  ->where('kurang', 1)
                  ->where('average_score', 71.25)
        )
    );
});