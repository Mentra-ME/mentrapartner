import React from 'react';
import { NavLink } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import logo from '../../../public/assets/pngs/logo.png'

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Student Logs', url: '/student-logs', icon: FileText },
  { title: 'Crisis Reports', url: '/crisis-reports', icon: AlertTriangle },
  { title: 'Journaling Topics', url: '/journaling-topics', icon: BookOpen },
  { title: 'Engagement Analytics', url: '/engagement', icon: BarChart3 },
  { title: 'School Admins', url: '/school-admins', icon: Settings },
  { title: 'AI Sessions', url: '/ai-sessions', icon: Bot },
  { title: 'Notifications', url: '/notifications', icon: Bell },
];

const sessionItems = [
  { title: 'EOS', url: '/eos', icon: Circle },
];

export const DashboardSidebar: React.FC = () => {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader
        className="p-6 transition-all duration-300"
        style={collapsed ? { width: '100px', paddingTop: '40px' } : undefined}
      >
        <div className="flex items-center gap-3 transition-all duration-300">
          <div className="p-2 bg-[#EFF5F6] rounded-lg flex items-center justify-center transition-all duration-300">
            <img
              className="h-8 w-auto transition-all duration-300"
              alt="logo"
              src={logo}
            />
          </div>
          {!collapsed && (
            <div className="transition-opacity duration-300 opacity-100">
              <h2 className="font-bold text-sidebar-foreground">Mentra</h2>
              <p className="text-xs text-sidebar-foreground/70">
                University Partner
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            MAIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-smooth ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            SESSIONS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-smooth ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
    </Sidebar>
  );
};