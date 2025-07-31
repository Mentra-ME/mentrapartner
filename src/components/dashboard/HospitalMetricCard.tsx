import React from 'react';
import {Card, CardContent} from '@/components/ui/card';

interface HospitalMetricCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconBgColor?: string;
    className?: string;
}

export const HospitalMetricCard: React.FC<HospitalMetricCardProps> = ({title, value, icon: Icon, iconBgColor = 'bg-primary', className,}) => {
    return (
        <Card className={`shadow-elegant transition-smooth hover:shadow-lg ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`p-4 ${iconBgColor} rounded-xl`}>
                        <Icon className="h-8 w-8 text-white"/>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                        <p className="text-3xl font-bold text-foreground">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};