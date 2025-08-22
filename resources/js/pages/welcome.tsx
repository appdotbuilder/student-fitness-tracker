import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, BarChart3, Users, Trophy, Target, Zap, Activity } from 'lucide-react';
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
                return 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm font-semibold';
            case 'Cukup':
                return 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm font-semibold';
            case 'Kurang':
                return 'bg-rose-50 text-rose-800 border-rose-300 shadow-sm font-semibold';
            default:
                return 'bg-slate-50 text-slate-800 border-slate-300 shadow-sm font-semibold';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 relative">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-sky-500/5 to-emerald-500/5"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                                 radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.06) 0%, transparent 40%)`
            }}></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-sky-400/10 to-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
                {/* Enhanced Header with Gradient */}
                <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-white/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                                    🏃‍♂️ Student Fitness Tracker
                                    <Zap className="w-8 h-8 text-violet-500" />
                                </h1>
                                <p className="text-slate-700 mt-2 text-lg font-medium">
                                    Track and analyze student physical fitness levels with comprehensive AI-powered scoring
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="lg"
                            >
                                <Plus className="w-5 h-5" />
                                Add Student
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Enhanced Statistics Cards with Better Contrast */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Total Students</CardTitle>
                                <div className="p-2 bg-slate-100 rounded-full">
                                    <Users className="h-5 w-5 text-slate-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total}</div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Students evaluated
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Excellent Fitness</CardTitle>
                                <div className="p-2 bg-emerald-100 rounded-full">
                                    <Trophy className="h-5 w-5 text-emerald-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-emerald-700 mb-1">{stats.baik}</div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Students with "Baik" level
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Average Fitness</CardTitle>
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <Target className="h-5 w-5 text-amber-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-amber-700 mb-1">{stats.cukup}</div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Students with "Cukup" level
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Average Score</CardTitle>
                                <div className="p-2 bg-violet-100 rounded-full">
                                    <BarChart3 className="h-5 w-5 text-violet-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-violet-700 mb-1">
                                    {stats.average_score.toFixed(1)}
                                </div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Out of 100 points
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Enhanced Add Student Form */}
                    {showForm && (
                        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-lg">
                                <CardTitle className="text-slate-900 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-violet-600" />
                                    Add New Student
                                </CardTitle>
                                <CardDescription className="text-slate-700 font-medium">
                                    Enter student information and physical test results to calculate fitness level
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <Label htmlFor="name" className="text-slate-700 font-semibold">Student Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter student name"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="age" className="text-slate-700 font-semibold">Age</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={data.age}
                                                onChange={(e) => setData('age', e.target.value)}
                                                placeholder="Years"
                                                min="10"
                                                max="30"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.age ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.age && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.age}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="height" className="text-slate-700 font-semibold">Height (cm)</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                step="0.1"
                                                value={data.height}
                                                onChange={(e) => setData('height', e.target.value)}
                                                placeholder="Centimeters"
                                                min="100"
                                                max="250"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.height ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.height && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.height}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="weight" className="text-slate-700 font-semibold">Weight (kg)</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                step="0.1"
                                                value={data.weight}
                                                onChange={(e) => setData('weight', e.target.value)}
                                                placeholder="Kilograms"
                                                min="30"
                                                max="150"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.weight ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.weight && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.weight}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="running_time" className="text-slate-700 font-semibold">Running Time (min)</Label>
                                            <Input
                                                id="running_time"
                                                type="number"
                                                step="0.1"
                                                value={data.running_time}
                                                onChange={(e) => setData('running_time', e.target.value)}
                                                placeholder="Minutes"
                                                min="5"
                                                max="30"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.running_time ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.running_time && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.running_time}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="sit_ups" className="text-slate-700 font-semibold">Sit-ups</Label>
                                            <Input
                                                id="sit_ups"
                                                type="number"
                                                value={data.sit_ups}
                                                onChange={(e) => setData('sit_ups', e.target.value)}
                                                placeholder="Number completed"
                                                min="0"
                                                max="100"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.sit_ups ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.sit_ups && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.sit_ups}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="push_ups" className="text-slate-700 font-semibold">Push-ups</Label>
                                            <Input
                                                id="push_ups"
                                                type="number"
                                                value={data.push_ups}
                                                onChange={(e) => setData('push_ups', e.target.value)}
                                                placeholder="Number completed"
                                                min="0"
                                                max="100"
                                                className={`mt-1 bg-white border-2 focus:border-violet-400 focus:ring-violet-200 text-slate-900 placeholder-slate-500 font-medium ${errors.push_ups ? 'border-red-500' : 'border-slate-200'}`}
                                            />
                                            {errors.push_ups && (
                                                <p className="text-red-600 text-sm mt-1 font-medium">{errors.push_ups}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button 
                                            type="submit" 
                                            disabled={processing}
                                            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                                            size="lg"
                                        >
                                            {processing ? 'Calculating...' : 'Calculate Fitness Level'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowForm(false)}
                                            className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                                            size="lg"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Enhanced Students Table with Better Contrast */}
                    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
                            <CardTitle className="text-slate-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-violet-600" />
                                Student Fitness Records
                            </CardTitle>
                            <CardDescription className="text-slate-700 font-medium">
                                Comprehensive fitness evaluation results with BMI, test scores, and fitness levels
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {students.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-6">🏃‍♂️</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                        No students recorded yet
                                    </h3>
                                    <p className="text-slate-600 mb-6 text-lg font-medium max-w-md mx-auto">
                                        Start by adding your first student to track their fitness journey and unlock powerful analytics
                                    </p>
                                    <Button 
                                        onClick={() => setShowForm(true)}
                                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                                        size="lg"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add First Student
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-50/80">
                                                <TableHead className="font-bold text-slate-900">Student Name</TableHead>
                                                <TableHead className="font-bold text-slate-900">Age</TableHead>
                                                <TableHead className="font-bold text-slate-900">BMI</TableHead>
                                                <TableHead className="font-bold text-slate-900">Running</TableHead>
                                                <TableHead className="font-bold text-slate-900">Sit-ups</TableHead>
                                                <TableHead className="font-bold text-slate-900">Push-ups</TableHead>
                                                <TableHead className="font-bold text-slate-900">Score</TableHead>
                                                <TableHead className="font-bold text-slate-900">Level</TableHead>
                                                <TableHead className="font-bold text-slate-900">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {students.map((student) => (
                                                <TableRow key={student.id} className="hover:bg-slate-50/60 transition-colors">
                                                    <TableCell className="font-bold text-slate-900">
                                                        {student.name}
                                                    </TableCell>
                                                    <TableCell className="font-semibold text-slate-800">{student.age}</TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold text-slate-900">
                                                            {student.bmi}
                                                            <br />
                                                            <span className="text-sm text-slate-600 font-medium">
                                                                {student.height}cm, {student.weight}kg
                                                            </span>
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold text-slate-900">
                                                            {student.running_time} min
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-bold text-slate-900">{student.sit_ups}</TableCell>
                                                    <TableCell className="font-bold text-slate-900">{student.push_ups}</TableCell>
                                                    <TableCell>
                                                        <span className="text-xl font-bold text-slate-900">
                                                            {student.fitness_score}
                                                        </span>
                                                        <span className="text-sm text-slate-600 font-semibold">/100</span>
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
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 font-semibold"
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

                    {/* Enhanced Fitness Level Distribution */}
                    {students.length > 0 && (
                        <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
                                <CardTitle className="text-slate-900 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-violet-600" />
                                    Fitness Level Distribution
                                </CardTitle>
                                <CardDescription className="text-slate-700 font-medium">
                                    Visual representation of student fitness levels across all evaluations
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    {/* Excellent Level */}
                                    <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-lg border border-emerald-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                                            <span className="font-bold text-slate-900 text-lg">Baik (Excellent)</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 bg-emerald-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm transition-all duration-500"
                                                    style={{
                                                        width: `${stats.total ? (stats.baik / stats.total) * 100 : 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-lg font-bold text-emerald-700 w-20">
                                                {stats.baik} ({stats.total ? Math.round((stats.baik / stats.total) * 100) : 0}%)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Average Level */}
                                    <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-lg border border-amber-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg"></div>
                                            <span className="font-bold text-slate-900 text-lg">Cukup (Average)</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 bg-amber-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full shadow-sm transition-all duration-500"
                                                    style={{
                                                        width: `${stats.total ? (stats.cukup / stats.total) * 100 : 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-lg font-bold text-amber-700 w-20">
                                                {stats.cukup} ({stats.total ? Math.round((stats.cukup / stats.total) * 100) : 0}%)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Poor Level */}
                                    <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-lg border border-rose-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full shadow-lg"></div>
                                            <span className="font-bold text-slate-900 text-lg">Kurang (Needs Improvement)</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-40 bg-rose-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-rose-500 to-rose-600 h-3 rounded-full shadow-sm transition-all duration-500"
                                                    style={{
                                                        width: `${stats.total ? (stats.kurang / stats.total) * 100 : 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-lg font-bold text-rose-700 w-20">
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
        </div>
    );
}