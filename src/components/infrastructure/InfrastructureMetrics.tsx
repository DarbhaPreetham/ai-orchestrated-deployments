
import React from 'react';
import { Activity, Zap, HardDrive, Wifi } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const metrics = [
  {
    name: 'Overall Health',
    value: 98.2,
    unit: '%',
    icon: Activity,
    color: 'text-green-600',
    trend: 'up',
    description: 'System availability'
  },
  {
    name: 'Performance Score',
    value: 89,
    unit: '/100',
    icon: Zap,
    color: 'text-blue-600',
    trend: 'up',
    description: 'Response time average'
  },
  {
    name: 'Storage Efficiency',
    value: 76,
    unit: '%',
    icon: HardDrive,
    color: 'text-purple-600',
    trend: 'stable',
    description: 'Optimization level'
  },
  {
    name: 'Network Latency',
    value: 12,
    unit: 'ms',
    icon: Wifi,
    color: 'text-orange-600',
    trend: 'down',
    description: 'Average response time'
  }
];

export const InfrastructureMetrics = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
        <span className="text-sm text-muted-foreground">Last 24 hours</span>
      </div>
      
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="font-medium text-foreground">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-foreground">
                  {metric.value}{metric.unit}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-500' : 
                  metric.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{metric.description}</div>
            <Progress 
              value={metric.name === 'Network Latency' ? 100 - (metric.value / 100 * 100) : metric.value} 
              className="h-2"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Performance Alert:</strong> All systems operating within optimal parameters
        </div>
      </div>
    </div>
  );
};
