
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Shield, 
  GitBranch, 
  Server, 
  Container, 
  Cloud, 
  Monitor, 
  Settings,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Infrastructure', href: '/infrastructure', icon: Server },
  { name: 'Containers', href: '/containers', icon: Container },
  { name: 'Pipelines', href: '/pipelines', icon: GitBranch },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Monitoring', href: '/monitoring', icon: Monitor },
  { name: 'Multi-Cloud', href: '/multicloud', icon: Cloud },
  { name: 'Cost Analysis', href: '/costs', icon: DollarSign },
  { name: 'Performance', href: '/performance', icon: Activity },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings }
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border h-[calc(100vh-80px)]">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
