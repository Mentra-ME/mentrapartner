import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const activityData = [
  { day: 'Mon', active: 28 },
  { day: 'Tue', active: 35 },
  { day: 'Wed', active: 42 },
  { day: 'Thu', active: 38 },
  { day: 'Fri', active: 45 },
  { day: 'Sat', active: 22 },
  { day: 'Sun', active: 18 },
];

const chartConfig = {
  active: {
    label: 'Active Students',
    color: 'hsl(var(--secondary))',
  },
};

export const StudentActivityChart: React.FC = () => {
  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Daily Active Students
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="active"
                fill="var(--color-active)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};