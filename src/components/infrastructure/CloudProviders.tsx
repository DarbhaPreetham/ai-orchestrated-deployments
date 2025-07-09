
import React from 'react';
import { Cloud, Server, Database, Globe, Shield, Zap } from 'lucide-react';

const providers = [
  {
    name: 'Amazon Web Services',
    short: 'AWS',
    status: 'active',
    resources: 89,
    cost: '$4,320',
    regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
    services: ['EC2', 'RDS', 'S3', 'Lambda', 'ELB'],
    color: 'bg-orange-500',
    logo: '🟠'
  },
  {
    name: 'Microsoft Azure',
    short: 'Azure',
    status: 'active',
    resources: 45,
    cost: '$2,890',
    regions: ['eastus', 'westeurope', 'southeastasia'],
    services: ['VMs', 'SQL DB', 'Blob', 'Functions', 'App Gateway'],
    color: 'bg-blue-500',
    logo: '🔵'
  },
  {
    name: 'Google Cloud Platform',
    short: 'GCP',
    status: 'active',
    resources: 32,
    cost: '$1,650',
    regions: ['us-central1', 'europe-west1', 'asia-southeast1'],
    services: ['Compute', 'Cloud SQL', 'Storage', 'Functions', 'Load Balancer'],
    color: 'bg-green-500',
    logo: '🟢'
  }
];

export const CloudProviders = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Multi-Cloud Overview</h3>
        </div>
        <span className="text-sm text-muted-foreground">3 Providers Connected</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div key={provider.name} className="p-4 rounded-lg border border-border bg-accent/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{provider.logo}</span>
                <div>
                  <h4 className="font-medium text-foreground">{provider.short}</h4>
                  <span className="text-xs text-green-600 capitalize">{provider.status}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">{provider.resources}</div>
                <div className="text-xs text-muted-foreground">resources</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Cost</span>
                <span className="text-sm font-medium text-foreground">{provider.cost}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Active Regions</span>
                <div className="flex flex-wrap gap-1">
                  {provider.regions.map((region) => (
                    <span key={region} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Services</span>
                <div className="flex flex-wrap gap-1">
                  {provider.services.slice(0, 3).map((service) => (
                    <span key={service} className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded">
                      {service}
                    </span>
                  ))}
                  {provider.services.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                      +{provider.services.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 rounded-lg bg-accent/30">
          <Server className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold text-foreground">166</div>
          <div className="text-xs text-muted-foreground">Total Instances</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-accent/30">
          <Database className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold text-foreground">24</div>
          <div className="text-xs text-muted-foreground">Databases</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-accent/30">
          <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold text-foreground">12</div>
          <div className="text-xs text-muted-foreground">Load Balancers</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-accent/30">
          <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-lg font-semibold text-foreground">8</div>
          <div className="text-xs text-muted-foreground">Security Groups</div>
        </div>
      </div>
    </div>
  );
};
