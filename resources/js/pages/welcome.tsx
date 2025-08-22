import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, BarChart3, Users, Trophy, Target, AlertCircle, CheckCircle } from 'lucide-react';
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
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ students, stats, flash }: Props) {
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
            onError: () => {
                // Keep form open if there are validation errors
                console.log('Validation errors:', errors);
            }
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
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Cukup':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Kurang':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                                🏃‍♂️ Student Fitness Tracker
                            </h1>
                            <p className="text-slate-700 mt-1 font-medium">
                                Track and analyze student physical fitness levels with comprehensive scoring
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            Add Student
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <p className="text-emerald-800 font-medium">{flash.success}</p>
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white shadow-sm border border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                            <p className="text-xs text-slate-600 font-medium">
                                Students evaluated
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm border border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700">Good Fitness</CardTitle>
                            <Trophy className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">{stats.baik}</div>
                            <p className="text-xs text-slate-600 font-medium">
                                Students with "Baik" level
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm border border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700">Average Fitness</CardTitle>
                            <Target className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">{stats.cukup}</div>
                            <p className="text-xs text-slate-600 font-medium">
                                Students with "Cukup" level
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm border border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700">Average Score</CardTitle>
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.average_score.toFixed(1)}
                            </div>
                            <p className="text-xs text-slate-600 font-medium">
                                Out of 100 points
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Student Form */}
                {showForm && (
                    <Card className="mb-8 bg-white shadow-md border border-slate-200">
                        <CardHeader className="bg-slate-50 border-b border-slate-200">
                            <CardTitle className="text-slate-900 flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Add New Student
                            </CardTitle>
                            <CardDescription className="text-slate-700">
                                Enter student information and physical test results to calculate fitness level
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-slate-800">
                                            Student Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter full name"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.name 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.name && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="age" className="text-sm font-semibold text-slate-800">
                                            Age (years) *
                                        </Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={data.age}
                                            onChange={(e) => setData('age', e.target.value)}
                                            placeholder="10-30"
                                            min="10"
                                            max="30"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.age 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.age && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.age}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="height" className="text-sm font-semibold text-slate-800">
                                            Height (cm) *
                                        </Label>
                                        <Input
                                            id="height"
                                            type="number"
                                            step="0.1"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            placeholder="100-250"
                                            min="100"
                                            max="250"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.height 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.height && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.height}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="weight" className="text-sm font-semibold text-slate-800">
                                            Weight (kg) *
                                        </Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            placeholder="30-150"
                                            min="30"
                                            max="150"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.weight 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.weight && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.weight}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="running_time" className="text-sm font-semibold text-slate-800">
                                            Running Time (min) *
                                        </Label>
                                        <Input
                                            id="running_time"
                                            type="number"
                                            step="0.1"
                                            value={data.running_time}
                                            onChange={(e) => setData('running_time', e.target.value)}
                                            placeholder="5-30"
                                            min="5"
                                            max="30"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.running_time 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.running_time && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.running_time}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sit_ups" className="text-sm font-semibold text-slate-800">
                                            Sit-ups *
                                        </Label>
                                        <Input
                                            id="sit_ups"
                                            type="number"
                                            value={data.sit_ups}
                                            onChange={(e) => setData('sit_ups', e.target.value)}
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.sit_ups 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.sit_ups && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.sit_ups}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="push_ups" className="text-sm font-semibold text-slate-800">
                                            Push-ups *
                                        </Label>
                                        <Input
                                            id="push_ups"
                                            type="number"
                                            value={data.push_ups}
                                            onChange={(e) => setData('push_ups', e.target.value)}
                                            placeholder="0-100"
                                            min="0"
                                            max="100"
                                            className={`bg-white border-2 text-slate-900 placeholder:text-slate-500 ${
                                                errors.push_ups 
                                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
                                                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                        />
                                        {errors.push_ups && (
                                            <div className="flex items-center gap-1 text-rose-700 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.push_ups}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-200">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Calculating...
                                            </>
                                        ) : (
                                            <>
                                                <BarChart3 className="w-4 h-4" />
                                                Calculate Fitness Level
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                        className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Students Table */}
                <Card className="bg-white shadow-md border border-slate-200">
                    <CardHeader className="bg-slate-50 border-b border-slate-200">
                        <CardTitle className="text-slate-900">Student Fitness Records</CardTitle>
                        <CardDescription className="text-slate-700">
                            Comprehensive fitness evaluation results with BMI, test scores, and fitness levels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {students.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🏃‍♂️</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    No students recorded yet
                                </h3>
                                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                    Start by adding your first student to track their fitness journey and see comprehensive analytics
                                </p>
                                <Button 
                                    onClick={() => setShowForm(true)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                                >
                                    Add First Student
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-slate-200">
                                            <TableHead className="font-semibold text-slate-800">Student Name</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Age</TableHead>
                                            <TableHead className="font-semibold text-slate-800">BMI</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Running</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Sit-ups</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Push-ups</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Score</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Level</TableHead>
                                            <TableHead className="font-semibold text-slate-800">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id} className="border-slate-200 hover:bg-slate-50">
                                                <TableCell className="font-semibold text-slate-900">
                                                    {student.name}
                                                </TableCell>
                                                <TableCell className="text-slate-700">{student.age}</TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-slate-900 font-medium">
                                                        {student.bmi}
                                                        <br />
                                                        <span className="text-xs text-slate-600">
                                                            {student.height}cm, {student.weight}kg
                                                        </span>
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {student.running_time} min
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-slate-900 font-medium">{student.sit_ups}</TableCell>
                                                <TableCell className="text-slate-900 font-medium">{student.push_ups}</TableCell>
                                                <TableCell>
                                                    <span className="font-bold text-slate-900">
                                                        {student.fitness_score}
                                                    </span>
                                                    <span className="text-xs text-slate-600">/100</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        className={`${getFitnessLevelColor(student.fitness_level)} font-semibold`}
                                                    >
                                                        {student.fitness_level}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(student.id)}
                                                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
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
                    <Card className="mt-8 bg-white shadow-md border border-slate-200">
                        <CardHeader className="bg-slate-50 border-b border-slate-200">
                            <CardTitle className="text-slate-900">Fitness Level Distribution</CardTitle>
                            <CardDescription className="text-slate-700">
                                Visual representation of student fitness levels across all records
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {/* Good Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                                        <span className="font-semibold text-slate-900">Baik (Good)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-slate-200 rounded-full h-3">
                                            <div
                                                className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${stats.total ? (stats.baik / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 w-20">
                                            {stats.baik} ({stats.total ? Math.round((stats.baik / stats.total) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Average Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-amber-500 rounded"></div>
                                        <span className="font-semibold text-slate-900">Cukup (Average)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-slate-200 rounded-full h-3">
                                            <div
                                                className="bg-amber-500 h-3 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${stats.total ? (stats.cukup / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 w-20">
                                            {stats.cukup} ({stats.total ? Math.round((stats.cukup / stats.total) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Poor Level */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-rose-500 rounded"></div>
                                        <span className="font-semibold text-slate-900">Kurang (Poor)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-slate-200 rounded-full h-3">
                                            <div
                                                className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${stats.total ? (stats.kurang / stats.total) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 w-20">
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