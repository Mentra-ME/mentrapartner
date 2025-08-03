import React from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { CrisisChart } from '@/components/dashboard/CrisisChart';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { StudentActivityChart } from '@/components/dashboard/StudentActivityChart';
import { SessionsTable } from '@/components/dashboard/SessionsTable';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, BookOpen, Activity } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/components/auth/AuthProvider';

export const Dashboard: React.FC = () => {
    const { data, isLoading, error } = useDashboard();
    const { user } = useAuth();

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Loading dashboard data...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-destructive">Error loading dashboard data</p>
                </div>
                <div className="text-center p-8">
                    <p className="text-muted-foreground mb-4">Failed to load dashboard data: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.company_name}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Students Registered"
                    value={data?.totalUsers?.toString() || "0"}
                    icon={Users}
                    trend={{value: 12, isPositive: true}}
                />
                <MetricCard
                    title="Total AI Sessions"
                    value={data?.totalAiSessions?.toString() || "0"}
                    icon={Activity}
                    trend={{value: 8, isPositive: true}}
                />
                <MetricCard
                    title="Avg. Session Duration"
                    value={data?.averageSessionDuration ? `${parseFloat(String(data.averageSessionDuration)).toFixed(0)} mins` : "0 mins"}
                    icon={Clock}
                    trend={{value: 5, isPositive: false}}
                />
                <Card className="shadow-elegant">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Top 3 Journal Topics</p>
                                <div className="space-y-1">
                                    {data?.topJournals?.slice(0, 3).map((topic, index) => (
                                        <div key={index} className="text-sm font-medium text-foreground">
                                            {topic}
                                        </div>
                                    )) || (
                                        <div className="text-sm text-muted-foreground">No data available</div>
                                    )}
                                </div>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CrisisChart />
                <EngagementChart monthlyActiveUsers={data?.monthlySessions}/>
                <StudentActivityChart dailyActiveUsers={data?.dailyActiveUsers} />
            </div>

            {/* Sessions Table */}
            <div className="space-y-6">
                <SessionsTable sessions={data?.latestSessions} />
            </div>
        </div>
    );
};
