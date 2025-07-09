
import React from 'react';
import { Activity, Cpu, HardDrive, Network, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const containerMetrics = [
  { name: 'web-frontend-1', cpu: 45, memory: 67, network: 23, status: 'healthy' },
  { name: 'web-frontend-2', cpu: 38, memory: 62, network: 28, status: 'healthy' },
  { name: 'api-gateway-1', cpu: 72, memory: 84, network: 45, status: 'warning' },
  { name: 'user-service-1', cpu: 23, memory: 34, network: 12, status: 'healthy' },
  { name: 'auth-service-1', cpu: 89, memory: 91, network: 67, status: 'critical' }
];

const resourceSummary = [
  { name: 'Total CPU Usage', value: 54, unit: '%', icon: Cpu, color: 'text-blue-600' },
  { name: 'Memory Usage', value: 68, unit: '%', icon: HardDrive, color: 'text-green-600' },
  { name: 'Network I/O', value: 35, unit: 'MB/s', icon: Network, color: 'text-purple-600' },
  { name: 'Active Containers', value: 156, unit: '', icon: Activity, color: 'text-orange-600' }
];

export const ContainerMetrics = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Container Metrics</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Live Data</span>
        </div>
      </div>
      
      {/* Resource Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {resourceSummary.map((resource) => (
          <div key={resource.name} className="p-4 rounded-lg bg-accent/20">
            <div className="flex items-center space-x-2 mb-2">
              <resource.icon className={`h-5 w-5 ${resource.color}`} />
              <span className="text-sm font-medium text-foreground">{resource.name}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {resource.value}{resource.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Container Details */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Container Performance</h4>
        <div className="space-y-4">
          {containerMetrics.map((container) => (
            <div key={container.name} className="p-4 rounded-lg bg-accent/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">{container.name}</span>
                <span className={`text-sm font-medium ${getStatusColor(container.status)}`}>
                  {container.status}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="text-foreground">{container.cpu}%</span>
                  </div>
                  <Progress value={container.cpu} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Memory</span>
                    <span className="text-foreground">{container.memory}%</span>
                  </div>
                  <Progress value={container.memory} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Network</span>
                    <span className="text-foreground">{container.network} MB/s</span>
                  </div>
                  <Progress value={container.network} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
