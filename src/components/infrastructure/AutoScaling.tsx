
import React from 'react';
import { TrendingUp, Settings, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const scalingGroups = [
  {
    name: 'Web Tier Auto Scaling',
    provider: 'AWS',
    currentInstances: 4,
    minInstances: 2,
    maxInstances: 10,
    targetUtilization: 70,
    currentUtilization: 68,
    status: 'active',
    lastScaled: '2 hours ago',
    scalingPolicy: 'Target Tracking'
  },
  {
    name: 'App Tier Auto Scaling',
    provider: 'Azure',
    currentInstances: 3,
    minInstances: 2,
    maxInstances: 8,
    targetUtilization: 75,
    currentUtilization: 82,
    status: 'scaling',
    lastScaled: '5 minutes ago',
    scalingPolicy: 'Step Scaling'
  },
  {
    name: 'Database Auto Scaling',
    provider: 'GCP',
    currentInstances: 2,
    minInstances: 1,
    maxInstances: 4,
    targetUtilization: 80,
    currentUtilization: 45,
    status: 'active',
    lastScaled: '6 hours ago',
    scalingPolicy: 'Scheduled'
  }
];

export const AutoScaling = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'scaling': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Auto Scaling Groups</h3>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {scalingGroups.map((group) => (
          <div key={group.name} className="p-4 rounded-lg border border-border bg-accent/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground">{group.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">{group.provider}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(group.status)}`}>
                    {group.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{group.currentInstances}</div>
                <div className="text-xs text-muted-foreground">instances</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Min/Max</span>
                <span className="font-medium text-foreground">{group.minInstances} - {group.maxInstances}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Target CPU</span>
                <span className="font-medium text-foreground">{group.targetUtilization}%</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Current CPU</span>
                <span className={`font-medium ${group.currentUtilization > group.targetUtilization ? 'text-red-600' : 'text-green-600'}`}>
                  {group.currentUtilization}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Last Scaled</span>
                <span className="font-medium text-foreground">{group.lastScaled}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{group.scalingPolicy}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Real-time monitoring</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800 dark:text-green-200">
            <strong>Cost Optimization:</strong> Auto-scaling has saved $2,340 this month by optimizing resource usage
          </span>
        </div>
      </div>
    </div>
  );
};
