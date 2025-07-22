import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


interface DailyActiveUser {
  day: string;
  active: number;
}

interface StudentActivityChartProps {
  dailyActiveUsers?: DailyActiveUser[];
}


const defaultActivityData = [
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

export const StudentActivityChart: React.FC<StudentActivityChartProps> = ({ dailyActiveUsers }) => {
    const activityData = dailyActiveUsers && dailyActiveUsers.length > 0 ? dailyActiveUsers : defaultActivityData;

  return (
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Daily Active Students
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                  data={activityData}
                  margin={{ top: 10, right: 20, bottom: 10, left: 10 }} // Prevent clipping
              >
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                    padding={{ left: 10, right: 10 }} // Adds spacing around bars
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                    padding={{ top: 10, bottom: 10 }} // vertical spacing
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                    dataKey="active"
                    fill="rgb(87, 138, 128)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={45} // Limit bar width to avoid overflow
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

  );
};
