
import React from 'react';
import { Server, Database, Globe, Cpu } from 'lucide-react';

const infrastructureData = [
  { name: 'AWS EC2', count: 45, status: 'healthy', icon: Server, color: 'bg-green-500' },
  { name: 'Azure VMs', count: 23, status: 'healthy', icon: Server, color: 'bg-blue-500' },
  { name: 'GCP Instances', count: 18, status: 'warning', icon: Server, color: 'bg-yellow-500' },
  { name: 'Databases', count: 12, status: 'healthy', icon: Database, color: 'bg-purple-500' },
  { name: 'Load Balancers', count: 8, status: 'healthy', icon: Globe, color: 'bg-indigo-500' },
  { name: 'Containers', count: 156, status: 'healthy', icon: Cpu, color: 'bg-orange-500' }
];

export const InfrastructureOverview = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Infrastructure Overview</h3>
        <span className="text-sm text-muted-foreground">Multi-Cloud Resources</span>
      </div>
      
      <div className="space-y-4">
        {infrastructureData.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${item.color}/20`}>
                <item.icon className={`h-4 w-4 ${item.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <div className="font-medium text-foreground">{item.name}</div>
                <div className="text-sm text-muted-foreground capitalize">{item.status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">{item.count}</div>
              <div className="text-xs text-muted-foreground">instances</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
