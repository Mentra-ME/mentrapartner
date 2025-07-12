import React from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { CrisisChart } from '@/components/dashboard/CrisisChart';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { StudentActivityChart } from '@/components/dashboard/StudentActivityChart';
import { SessionsTable } from '@/components/dashboard/SessionsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, BookOpen, Activity } from 'lucide-react';

const topJournalTopics = [
  'Anxiety',
  'Motivation', 
  'Self-worth'
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your Mentra Partner Dashboard</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Students Registered"
          value="124"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Sessions Logged"
          value="542"
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Avg. Session Duration"
          value="14 mins"
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
        />
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">Top 3 Journal Topics</p>
                <div className="space-y-1">
                  {topJournalTopics.map((topic, index) => (
                    <div key={index} className="text-sm font-medium text-foreground">
                      {topic}
                    </div>
                  ))}
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
        <EngagementChart />
        <StudentActivityChart />
      </div>

      {/* Sessions Table */}
      <div className="space-y-6">
        <SessionsTable />
      </div>
    </div>
  );
};