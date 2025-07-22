import React from 'react';
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {DashboardSidebar} from '@/components/dashboard/DashboardSidebar';
import {useAuth} from "@/components/auth/AuthProvider.tsx";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    const {user} = useAuth();
    
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <DashboardSidebar/>

                <div className="flex-1 flex flex-col">
                    <header className="h-16 border-b border-border bg-card flex items-center px-6">
                        <SidebarTrigger className="mr-4 z-20"/>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-foreground uppercase">{user.company_name}</h2>
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