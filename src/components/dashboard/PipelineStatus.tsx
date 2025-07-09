
import React from 'react';
import { GitBranch, CheckCircle, XCircle, Clock, Play } from 'lucide-react';

const pipelines = [
  { 
    name: 'Frontend Deploy', 
    status: 'success', 
    lastRun: '2 minutes ago',
    duration: '3m 45s',
    branch: 'main',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  { 
    name: 'API Gateway', 
    status: 'running', 
    lastRun: 'Running now',
    duration: '1m 32s',
    branch: 'develop',
    icon: Play,
    color: 'text-blue-600'
  },
  { 
    name: 'Database Migration', 
    status: 'failed', 
    lastRun: '15 minutes ago',
    duration: '0m 45s',
    branch: 'hotfix',
    icon: XCircle,
    color: 'text-red-600'
  },
  { 
    name: 'Security Scan', 
    status: 'pending', 
    lastRun: '1 hour ago',
    duration: '2m 15s',
    branch: 'main',
    icon: Clock,
    color: 'text-yellow-600'
  }
];

export const PipelineStatus = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">CI/CD Pipelines</h3>
        </div>
        <span className="text-sm text-muted-foreground">Last 24 hours</span>
      </div>
      
      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <div key={pipeline.name} className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
            <div className="flex items-center space-x-3">
              <pipeline.icon className={`h-5 w-5 ${pipeline.color}`} />
              <div>
                <div className="font-medium text-foreground">{pipeline.name}</div>
                <div className="text-sm text-muted-foreground">
                  {pipeline.branch} • {pipeline.lastRun}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium capitalize ${pipeline.color}`}>
                {pipeline.status}
              </div>
              <div className="text-xs text-muted-foreground">{pipeline.duration}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-muted-foreground">Success Rate: 87%</span>
        <span className="text-muted-foreground">Avg Duration: 2m 34s</span>
      </div>
    </div>
  );
};
