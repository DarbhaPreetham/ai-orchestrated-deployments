
import React from 'react';
import { GitBranch, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

const metrics = [
  {
    title: 'Success Rate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'positive',
    icon: CheckCircle,
    description: 'Last 30 days'
  },
  {
    title: 'Avg Build Time',
    value: '4m 32s',
    change: '-15s',
    changeType: 'positive',
    icon: Clock,
    description: 'Deployment duration'
  },
  {
    title: 'Daily Deployments',
    value: '23',
    change: '+5',
    changeType: 'positive',
    icon: GitBranch,
    description: 'Across all projects'
  },
  {
    title: 'Failed Deployments',
    value: '3',
    change: '+1',
    changeType: 'negative',
    icon: XCircle,
    description: 'This week'
  }
];

export const PipelineMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <metric.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.changeType === 'positive' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
