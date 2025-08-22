<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property string $name
 * @property int $age
 * @property float $height
 * @property float $weight
 * @property float $running_time
 * @property int $sit_ups
 * @property int $push_ups
 * @property float $fitness_score
 * @property string $fitness_level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereAge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFitnessLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFitnessScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student wherePushUps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereRunningTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereSitUps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereWeight($value)
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'age',
        'height',
        'weight',
        'running_time',
        'sit_ups',
        'push_ups',
        'fitness_score',
        'fitness_level',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'age' => 'integer',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'running_time' => 'decimal:2',
        'sit_ups' => 'integer',
        'push_ups' => 'integer',
        'fitness_score' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Calculate fitness score based on physical test results.
     *
     * @return float
     */
    public function calculateFitnessScore(): float
    {
        // BMI calculation
        $heightInMeters = $this->height / 100;
        $bmi = $this->weight / ($heightInMeters * $heightInMeters);
        
        // BMI score (lower is better, optimal BMI is 18.5-24.9)
        $bmiScore = 0;
        if ($bmi >= 18.5 && $bmi <= 24.9) {
            $bmiScore = 25;
        } elseif ($bmi >= 17 && $bmi < 18.5) {
            $bmiScore = 20;
        } elseif ($bmi >= 25 && $bmi <= 29.9) {
            $bmiScore = 20;
        } elseif ($bmi >= 16 && $bmi < 17) {
            $bmiScore = 15;
        } elseif ($bmi >= 30 && $bmi <= 34.9) {
            $bmiScore = 15;
        } else {
            $bmiScore = 10;
        }
        
        // Running score (faster is better)
        $runningScore = 0;
        if ($this->running_time <= 8) {
            $runningScore = 25;
        } elseif ($this->running_time <= 10) {
            $runningScore = 20;
        } elseif ($this->running_time <= 12) {
            $runningScore = 15;
        } elseif ($this->running_time <= 15) {
            $runningScore = 10;
        } else {
            $runningScore = 5;
        }
        
        // Sit-ups score (more is better)
        $sitUpsScore = 0;
        if ($this->sit_ups >= 50) {
            $sitUpsScore = 25;
        } elseif ($this->sit_ups >= 40) {
            $sitUpsScore = 20;
        } elseif ($this->sit_ups >= 30) {
            $sitUpsScore = 15;
        } elseif ($this->sit_ups >= 20) {
            $sitUpsScore = 10;
        } else {
            $sitUpsScore = 5;
        }
        
        // Push-ups score (more is better)
        $pushUpsScore = 0;
        if ($this->push_ups >= 30) {
            $pushUpsScore = 25;
        } elseif ($this->push_ups >= 25) {
            $pushUpsScore = 20;
        } elseif ($this->push_ups >= 20) {
            $pushUpsScore = 15;
        } elseif ($this->push_ups >= 15) {
            $pushUpsScore = 10;
        } else {
            $pushUpsScore = 5;
        }
        
        return $bmiScore + $runningScore + $sitUpsScore + $pushUpsScore;
    }

    /**
     * Determine fitness level based on fitness score.
     *
     * @param float $score
     * @return string
     */
    public static function determineFitnessLevel(float $score): string
    {
        if ($score >= 80) {
            return 'Baik';
        } elseif ($score >= 60) {
            return 'Cukup';
        } else {
            return 'Kurang';
        }
    }

    /**
     * Get BMI value.
     *
     * @return float
     */
    public function getBmiAttribute(): float
    {
        $heightInMeters = $this->height / 100;
        return round($this->weight / ($heightInMeters * $heightInMeters), 2);
    }
}