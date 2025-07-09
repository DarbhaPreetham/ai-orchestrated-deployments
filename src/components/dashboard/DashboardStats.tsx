
import React from 'react';
import { TrendingUp, TrendingDown, Server, Shield, GitBranch, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Active Services',
    value: '247',
    change: '+12%',
    changeType: 'positive',
    icon: Server,
    description: 'Across all environments'
  },
  {
    title: 'Security Score',
    value: '94%',
    change: '+2%',
    changeType: 'positive',
    icon: Shield,
    description: 'Compliance rating'
  },
  {
    title: 'Deployments Today',
    value: '18',
    change: '+5',
    changeType: 'positive',
    icon: GitBranch,
    description: 'Successful releases'
  },
  {
    title: 'Monthly Spend',
    value: '$12,450',
    change: '-8%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'Multi-cloud costs'
  }
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.changeType === 'positive' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
