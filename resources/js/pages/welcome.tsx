import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, BarChart3, Users, Trophy, Target } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Student {
    id: number;
    name: string;
    age: number;
    height: number;
    weight: number;
    running_time: number;
    sit_ups: number;
    push_ups: number;
    fitness_score: number;
    fitness_level: 'Baik' | 'Cukup' | 'Kurang';
    bmi: number;
    created_at: string;
    [key: string]: unknown;
}

interface Stats {
    total: number;
    baik: number;
    cukup: number;
    kurang: number;
    average_score: number;
}

interface Props {
    students: Student[];
    stats: Stats;
    [key: string]: unknown;
}

export default function Welcome({ students, stats }: Props) {
    const [showForm, setShowForm] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        age: '',
        height: '',
        weight: '',
        running_time: '',
        sit_ups: '',
        push_ups: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('students.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this student record?')) {
            router.delete(route('students.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const getFitnessLevelColor = (level: string) => {
        switch (level) {
            case 'Baik':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Cukup':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Kurang':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                🏃‍♂️ Student Fitness Tracker
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Track and analyze student physical fitness levels with comprehensive scoring
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Student
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">
                                Students evaluated
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Good Fitness</CardTitle>
                            <Trophy className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.baik}</div>
                            <p className="text-xs text-muted-foreground">
                                Students with "Baik" level
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Fitness</CardTitle>
                            <Target className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.cukup}</div>
                            <p className="text-xs text-muted-foreground">
                                Students with "Cukup" level
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.average_score.toFixed(1)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Out of 100 points
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Student Form */}
                {showForm && (
                    <Card className="mb-8 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle>Add New Student</CardTitle>
                            <CardDescription>
                                Enter student information and physical test results to calculate fitness level
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="name">Student Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter student name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={data.age}
                                            onChange={(e) => setData('age', e.target.value)}
                                            placeholder="Years"
                                            min="10"
                                            max="30"
                                            className={errors.age ? 'border-red-500' : ''}
                                        />
                                        {errors.age && (
                                            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="height">Height (cm)</Label>
                                        <Input
                                            id="height"
                                            type="number"
                                            step="0.1"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            placeholder="Centimeters"
                                            min="100"
                                            max="250"
                                            className={errors.height ? 'border-red-500' : ''}
                                        />
                                        {errors.height && (
                                            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            placeholder="Kilograms"
                                            min="30"
                                            max="150"
                                            className={errors.weight ? 'border-red-500' : ''}
                                        />
                                        {errors.weight && (
                                            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="running_time">Running Time (min)</Label>
                                        <Input
                                            id="running_time"
                                            type="number"
                                            step="0.1"
                                            value={data.running_time}
                                            onChange={(e) => setData('running_time', e.target.value)}
                                            placeholder="Minutes"
                                            min="5"
                                            max="30"
                                            className={errors.running_time ? 'border-red-500' : ''}
                                        />
                                        {errors.running_time && (
                                            <p className="text-red-500 text-sm mt-1">{errors.running_time}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="sit_ups">Sit-ups</Label>
                                        <Input
                                            id="sit_ups"
                                            type="number"
                                            value={data.sit_ups}
                                            onChange={(e) => setData('sit_ups', e.target.value)}
                                            placeholder="Number completed"
                                            min="0"
                                            max="100"
                                            className={errors.sit_ups ? 'border-red-500' : ''}
                                        />
                                        {errors.sit_ups && (
                                            <p className="text-red-500 text-sm mt-1">{errors.sit_ups}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="push_ups">Push-ups</Label>
                                        <Input
                                            id="push_ups"
                                            type="number"
                                            value={data.push_ups}
                                            onChange={(e) => setData('push_ups', e.target.value)}
                                            placeholder="Number completed"
                                            min="0"
                                            max="100"
                                            className={errors.push_ups ? 'border-red-500' : ''}
                                        />
                                        {errors.push_ups && (
                                            <p className="text-red-500 text-sm mt-1">{errors.push_ups}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Calculating...' : 'Calculate Fitness Level'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Students Table */}
                <Card className="bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle>Student Fitness Records</CardTitle>
                        <CardDescription>
                            Comprehensive fitness evaluation results with BMI, test scores, and fitness levels
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {students.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">🏃‍♂️</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No students recorded yet
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Start by adding your first student to track their fitness journey
                                </p>
                                <Button onClick={() => setShowForm(true)}>
                                    Add First Student
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student Name</TableHead>
                                            <TableHead>Age</TableHead>
                                            <TableHead>BMI</TableHead>
                                            <TableHead>Running</TableHead>
                                            <TableHead>Sit-ups</TableHead>
                                            <TableHead>Push-ups</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Level</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">
                                                    {student.name}
                                                </TableCell>
                                                <TableCell>{student.age}</TableCell>
                                                <TableCell>
                                                    <span className="text-sm">
                                                        {student.bmi}
                                                        <br />
                                                        <span className="text-xs text-gray-500">
                                                            {student.height}cm, {student.weight}kg
                                                        </span>
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">
                                                        {student.running_time} min
                                                    </span>
                                                </TableCell>
                                                <TableCell>{student.sit_ups}</TableCell>
                                                <TableCell>{student.push_ups}</TableCell>
                                                <TableCell>
                                                    <span className="font-semibold">
                                                        {student.fitness_score}
                                                    </span>
                                                    <span className="text-xs text-gray-500">/100</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        className={getFitnessLevelColor(student.fitness_level)}
                                                    >
                                                        {student.fitness_level}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(student.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Fitness Level Distribution */}
                {students.length > 0 && (
                    <Card className="mt-8 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle>Fitness Level Distribution</CardTitle>
                            <CardDescription>
                                Visual representation of student fitness levels
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Good Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                                        <span className="font-medium">Baik (Good)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{
                                                    width: `${stats.total ? (stats.baik / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-16">
                                            {stats.baik} ({stats.total ? Math.round((stats.baik / stats.total) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Average Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                        <span className="font-medium">Cukup (Average)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-yellow-500 h-2 rounded-full"
                                                style={{
                                                    width: `${stats.total ? (stats.cukup / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-16">
                                            {stats.cukup} ({stats.total ? Math.round((stats.cukup / stats.total) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Poor Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                                        <span className="font-medium">Kurang (Poor)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full"
                                                style={{
                                                    width: `${stats.total ? (stats.kurang / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-16">
                                            {stats.kurang} ({stats.total ? Math.round((stats.kurang / stats.total) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}