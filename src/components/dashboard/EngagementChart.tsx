import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const engagementData = [
  { month: 'Jan', sessions: 45 },
  { month: 'Feb', sessions: 52 },
  { month: 'Mar', sessions: 48 },
  { month: 'Apr', sessions: 61 },
  { month: 'May', sessions: 55 },
  { month: 'Jun', sessions: 67 },
];

const chartConfig = {
  sessions: {
    label: 'Sessions',
    color: 'hsl(var(--primary))',
  },
};

export const EngagementChart: React.FC = () => {
  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Monthly Engagement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData}>
              <XAxis 
                dataKey="month" 
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
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="var(--color-sessions)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sessions)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};