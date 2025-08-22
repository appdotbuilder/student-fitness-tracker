import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Users, Target, BarChart3, Plus, Trophy, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
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
                
                <div className="relative z-10 p-6">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3 mb-2">
                            🏃‍♂️ Fitness Dashboard
                            <Zap className="w-8 h-8 text-violet-500" />
                        </h1>
                        <p className="text-slate-700 text-lg font-medium">
                            Monitor student fitness progress and analytics
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Active Students</CardTitle>
                                <div className="p-2 bg-violet-100 rounded-full">
                                    <Users className="h-5 w-5 text-violet-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 mb-1">24</div>
                                <p className="text-sm text-slate-600 font-medium flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    +12% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Avg Fitness Score</CardTitle>
                                <div className="p-2 bg-emerald-100 rounded-full">
                                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 mb-1">78.5</div>
                                <p className="text-sm text-slate-600 font-medium flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    +5.2 points this week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Top Performers</CardTitle>
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <Trophy className="h-5 w-5 text-amber-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 mb-1">8</div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Students with "Baik" level
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-slate-700">Assessments Today</CardTitle>
                                <div className="p-2 bg-sky-100 rounded-full">
                                    <Activity className="h-5 w-5 text-sky-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 mb-1">6</div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Fitness tests completed
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Quick Actions */}
                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-lg">
                                <CardTitle className="text-slate-900 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-violet-600" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription className="text-slate-700 font-medium">
                                    Common tasks and shortcuts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <Button 
                                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold justify-start"
                                    size="lg"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Student
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold justify-start"
                                    size="lg"
                                >
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    View Analytics
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold justify-start"
                                    size="lg"
                                >
                                    <Trophy className="w-5 h-5 mr-2" />
                                    Export Reports
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 lg:col-span-2">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
                                <CardTitle className="text-slate-900 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-violet-600" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription className="text-slate-700 font-medium">
                                    Latest fitness assessments and updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-lg border border-emerald-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <Trophy className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">Ahmad Rahman achieved "Baik" level</p>
                                                <p className="text-sm text-slate-600">Fitness score: 85/100</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold">
                                            Just now
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-lg border border-violet-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                                                <Plus className="w-4 h-4 text-violet-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">New student added: Siti Nurhaliza</p>
                                                <p className="text-sm text-slate-600">Ready for fitness assessment</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-violet-100 text-violet-800 border-violet-300 font-semibold">
                                            5 min ago
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-sky-50/50 rounded-lg border border-sky-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                                <BarChart3 className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">Weekly report generated</p>
                                                <p className="text-sm text-slate-600">24 students assessed this week</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-sky-100 text-sky-800 border-sky-300 font-semibold">
                                            1 hour ago
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Overview */}
                    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
                            <CardTitle className="text-slate-900 flex items-center gap-2">
                                <Target className="w-5 h-5 text-violet-600" />
                                Performance Overview
                            </CardTitle>
                            <CardDescription className="text-slate-700 font-medium">
                                Class fitness level distribution and trends
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-emerald-50/50 rounded-xl border border-emerald-200">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Trophy className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-emerald-700 mb-1">33%</h3>
                                    <p className="text-slate-700 font-semibold">Excellent Level</p>
                                    <p className="text-sm text-slate-600 mt-1">8 of 24 students</p>
                                </div>

                                <div className="text-center p-6 bg-amber-50/50 rounded-xl border border-amber-200">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-amber-700 mb-1">42%</h3>
                                    <p className="text-slate-700 font-semibold">Average Level</p>
                                    <p className="text-sm text-slate-600 mt-1">10 of 24 students</p>
                                </div>

                                <div className="text-center p-6 bg-rose-50/50 rounded-xl border border-rose-200">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Activity className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-rose-700 mb-1">25%</h3>
                                    <p className="text-slate-700 font-semibold">Needs Improvement</p>
                                    <p className="text-sm text-slate-600 mt-1">6 of 24 students</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}