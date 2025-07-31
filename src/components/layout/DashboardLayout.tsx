import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { HospitalSidebar } from '@/components/dashboard/HospitalSidebar';
import { useAuth } from '@/components/auth/AuthProvider';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user } = useAuth();
    const isHospital = user?.user_type === 'hospital';

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                {isHospital ? <HospitalSidebar /> : <DashboardSidebar />}

                <div className="flex-1 flex flex-col">
                    <header className="h-16 border-b border-border bg-card flex items-center px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-foreground">
                                {isHospital ? 'Mentra Hospital Partner Dashboard' : 'Mentra University Partner Dashboard'}
                            </h2>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};