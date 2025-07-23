import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    LayoutDashboard,
    FileText,
    AlertTriangle,
    BookOpen,
    BarChart3,
    Settings,
    Bot,
    Bell,
    Circle,
    Shield,
    LogOut,
    Key,
} from 'lucide-react';
import {useAuth} from '@/components/auth/AuthProvider';
import {Button} from '@/components/ui/button';

const navigationItems = [
    {title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard},
    {title: 'Student Logs', url: '/student-logs', icon: FileText},
    {title: 'Crisis Reports', url: '/crisis-reports', icon: AlertTriangle},
    {title: 'Journaling Topics', url: '/journaling-topics', icon: BookOpen},
    {title: 'Engagement Analytics', url: '/engagement', icon: BarChart3},
    {title: 'School Admin', url: '/school-admins', icon: Settings},
    {title: 'AI Sessions', url: '/ai-sessions', icon: Bot},
    {title: 'Notifications', url: '/notifications', icon: Bell},
];

const sessionItems = [
    {title: 'EOS', url: '/eos', icon: Circle},
];

export const DashboardSidebar: React.FC = () => {
    const {state} = useSidebar();
    const {user, logout} = useAuth();
    const collapsed = state === 'collapsed';

    return (
        <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sidebar-primary rounded-lg">
                        <Shield className="h-6 w-6 text-sidebar-primary-foreground"/>
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="font-bold text-sidebar-foreground">Mentra</h2>
                            <p className="text-xs text-sidebar-foreground/70">University Partner</p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/70">MAIN</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({isActive}) =>
                                                `flex items-center gap-3 transition-smooth ${
                                                    isActive
                                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                                }`
                                            }
                                        >
                                            <item.icon className="h-4 w-4"/>
                                            {!collapsed && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/70">SESSIONS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sessionItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({isActive}) =>
                                                `flex items-center gap-3 transition-smooth ${
                                                    isActive
                                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                                }`
                                            }
                                        >
                                            <item.icon className="h-4 w-4"/>
                                            {!collapsed && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/70">ACCOUNT</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to="/update-password"
                                        className={({isActive}) =>
                                            `flex items-center gap-3 transition-smooth ${
                                                isActive
                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                            }`
                                        }
                                    >
                                        <Key className="h-4 w-4"/>
                                        {!collapsed && <span>Update Password</span>}
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {!collapsed && (
                <div className="p-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-5 h-5 bg-sidebar-primary rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-sidebar-primary-foreground leading-none p-3">
                           {user?.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-sidebar-foreground">
                                {user?.name}
                            </p>
                            <p className="text-xs text-sidebar-foreground/70">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={logout}
                        variant="outline"
                        size="sm"
                        className="w-full border-sidebar-border text-black "
                    >
                        <LogOut className="h-4 w-4 mr-2"/>
                        Logout
                    </Button>
                </div>
            )}
        </Sidebar>
    );
};
