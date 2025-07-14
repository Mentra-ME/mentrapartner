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
  { month: 'Jul', sessions: 90 },
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
          <CardTitle className="text-lg font-semibold text-foreground mb-12">
            Monthly Engagement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  data={engagementData}
                  margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
              >
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                    padding={{ left: 10, right: 10 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                    padding={{ top: 10, bottom: 10 }}
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