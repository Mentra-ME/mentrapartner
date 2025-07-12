import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title, 
  description = "This feature is currently under development and will be available soon." 
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>

      <Card className="shadow-elegant max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};