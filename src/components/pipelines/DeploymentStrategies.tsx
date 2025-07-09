
import React from 'react';
import { Target, Zap, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const strategies = [
  {
    name: 'Blue-Green Deployment',
    icon: Target,
    description: 'Zero-downtime deployment with instant rollback',
    features: ['Zero downtime', 'Instant rollback', 'Full testing'],
    status: 'active',
    environments: ['staging', 'production']
  },
  {
    name: 'Canary Deployment',
    icon: Zap,
    description: 'Gradual rollout to minimize risk',
    features: ['Risk reduction', 'A/B testing', 'Gradual rollout'],
    status: 'available',
    environments: ['production']
  },
  {
    name: 'Rolling Deployment',
    icon: ArrowRight,
    description: 'Sequential update of instances',
    features: ['Resource efficient', 'Continuous service', 'Configurable pace'],
    status: 'available',
    environments: ['staging', 'production']
  }
];

const currentDeployment = {
  strategy: 'Blue-Green',
  environment: 'production',
  version: 'v2.1.3',
  progress: 85,
  status: 'deploying'
};

export const DeploymentStrategies = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Deployment Strategies</h3>
        <Button size="sm" variant="outline">Configure</Button>
      </div>
      
      {/* Current Deployment */}
      <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800 dark:text-blue-200">
              {currentDeployment.strategy} Active
            </span>
          </div>
          <span className="text-xs text-blue-600">{currentDeployment.status}</span>
        </div>
        <div className="text-sm text-blue-700 dark:text-blue-300 mb-3">
          Deploying {currentDeployment.version} to {currentDeployment.environment}
        </div>
        <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentDeployment.progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-blue-600 mt-1">{currentDeployment.progress}% complete</div>
      </div>

      {/* Available Strategies */}
      <div className="space-y-3">
        {strategies.map((strategy, index) => (
          <div key={index} className="p-4 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <strategy.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{strategy.name}</span>
                {strategy.status === 'active' && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {strategy.features.map((feature, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Environments: {strategy.environments.join(', ')}
              </div>
              {strategy.status === 'available' && (
                <Button size="sm" variant="ghost" className="text-xs">
                  Configure
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
