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
    Users,
    FileText,
    ClipboardList,
    DollarSign,
    ShoppingCart,
    Bell,
    Heart,
    LogOut,
    Key,
} from 'lucide-react';
import {useAuth} from '@/components/auth/AuthProvider';
import {Button} from '@/components/ui/button';

const navigationItems = [
    {title: 'Dashboard', url: '/dashboard-hospital', icon: LayoutDashboard},
    {title: 'Patient Referrals', url: '/patient-referrals', icon: Users},
    {title: 'Invoices', url: '/invoices', icon: FileText},
    {title: 'Claims', url: '/claims', icon: ClipboardList},
    {title: 'Pricing', url: '/pricing', icon: DollarSign},
    {title: 'Purchases', url: '/purchases', icon: ShoppingCart},
    {title: 'Notification', url: '/notifications', icon: Bell},
];

export const HospitalSidebar: React.FC = () => {
    const {state} = useSidebar();
    const {user, logout} = useAuth();
    const collapsed = state === 'collapsed';

    return (
        <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sidebar-primary rounded-lg">
                        <Heart className="h-6 w-6 text-sidebar-primary-foreground"/>
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="font-bold text-sidebar-foreground">Mentra</h2>
                            <p className="text-xs text-sidebar-foreground/70">Hospital Partner</p>
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
                        <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-sidebar-primary-foreground">
                {user?.name?.charAt(0)}
              </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
                            <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        onClick={logout}
                        variant="outline"
                        size="sm"
                        className="w-full border-sidebar-border text-gray-900 hover:bg-gray-100"
                    >
                        <LogOut className="h-4 w-4 mr-2 text-gray-900" />
                        Logout
                    </Button>
                </div>
            )}
        </Sidebar>
    );
};