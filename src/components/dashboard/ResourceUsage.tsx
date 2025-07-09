
import React from 'react';
import { Cpu, HardDrive, Zap, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const resourceMetrics = [
  { 
    name: 'CPU Usage', 
    current: 68, 
    limit: 100, 
    unit: '%',
    icon: Cpu,
    trend: '+5%',
    color: 'text-blue-600'
  },
  { 
    name: 'Memory Usage', 
    current: 12.4, 
    limit: 16, 
    unit: 'GB',
    icon: HardDrive,
    trend: '+2%',
    color: 'text-green-600'
  },
  { 
    name: 'Storage Used', 
    current: 2.8, 
    limit: 5, 
    unit: 'TB',
    icon: HardDrive,
    trend: '+12%',
    color: 'text-purple-600'
  },
  { 
    name: 'Network I/O', 
    current: 145, 
    limit: 200, 
    unit: 'Mbps',
    icon: Zap,
    trend: '-3%',
    color: 'text-orange-600'
  }
];

export const ResourceUsage = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Resource Usage</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Real-time</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {resourceMetrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="font-medium text-foreground">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">
                  {metric.current}{metric.unit} / {metric.limit}{metric.unit}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric.trend.startsWith('+') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </div>
            <Progress 
              value={metric.unit === '%' ? metric.current : (metric.current / metric.limit) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Auto-scaling enabled:</strong> Resources will scale automatically based on demand
        </div>
      </div>
    </div>
  );
};
