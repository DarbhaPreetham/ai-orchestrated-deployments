
import React from 'react';
import { Container, Server, Cpu, HardDrive, TrendingUp, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerStats = [
  { name: 'Running Containers', count: 156, status: 'healthy', icon: Play, color: 'text-green-600' },
  { name: 'Stopped Containers', count: 23, status: 'stopped', icon: Pause, color: 'text-yellow-600' },
  { name: 'Failed Containers', count: 4, status: 'error', icon: Square, color: 'text-red-600' },
  { name: 'K8s Pods', count: 89, status: 'healthy', icon: Container, color: 'text-blue-600' }
];

const recentDeployments = [
  { name: 'web-frontend:v2.1.3', status: 'deployed', time: '2 minutes ago', replicas: 5 },
  { name: 'api-gateway:v1.8.1', status: 'deploying', time: '5 minutes ago', replicas: 3 },
  { name: 'user-service:v3.2.0', status: 'deployed', time: '1 hour ago', replicas: 8 },
  { name: 'auth-service:v2.5.4', status: 'failed', time: '2 hours ago', replicas: 2 }
];

export const ContainerOverview = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {containerStats.map((stat) => (
          <div key={stat.name} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat.count}</div>
                <div className="text-xs text-muted-foreground capitalize">{stat.status}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Recent Deployments */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Deployments</h3>
          <Button size="sm">Deploy New</Button>
        </div>
        
        <div className="space-y-3">
          {recentDeployments.map((deployment, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
              <div className="flex items-center space-x-3">
                <Container className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">{deployment.name}</div>
                  <div className="text-sm text-muted-foreground">{deployment.time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  {deployment.replicas} replicas
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  deployment.status === 'deployed' ? 'bg-green-100 text-green-700' :
                  deployment.status === 'deploying' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {deployment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
