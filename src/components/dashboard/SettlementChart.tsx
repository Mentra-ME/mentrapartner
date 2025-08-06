import React from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const settlementData = [
    {name: 'Mentra App', value: 16, color: '#f59e0b'},
    {name: 'Partner Webapp', value: 14, color: '#0f766e'},
];

const COLORS = ['#f59e0b', '#0f766e'];

export const SettlementChart: React.FC = () => {
    const total = settlementData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="shadow-elegant">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                    Settlement Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={settlementData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {settlementData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground">{total}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
