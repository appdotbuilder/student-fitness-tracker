<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::latest()->get();
        
        // Calculate statistics for visualization
        $stats = [
            'total' => $students->count(),
            'baik' => $students->where('fitness_level', 'Baik')->count(),
            'cukup' => $students->where('fitness_level', 'Cukup')->count(),
            'kurang' => $students->where('fitness_level', 'Kurang')->count(),
            'average_score' => $students->avg('fitness_score') ?? 0,
        ];

        return Inertia::render('welcome', [
            'students' => $students,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $validated = $request->validated();
        
        // Create temporary student to calculate fitness data
        $tempStudent = new Student($validated);
        $fitnessScore = $tempStudent->calculateFitnessScore();
        $fitnessLevel = Student::determineFitnessLevel($fitnessScore);
        
        // Add calculated values
        $validated['fitness_score'] = $fitnessScore;
        $validated['fitness_level'] = $fitnessLevel;
        
        $student = Student::create($validated);

        return redirect()->route('students.index')
            ->with('success', 'Student fitness data recorded successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student record deleted successfully.');
    }
}