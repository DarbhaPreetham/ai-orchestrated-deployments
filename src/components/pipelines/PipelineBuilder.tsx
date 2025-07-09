
import React, { useState } from 'react';
import { Plus, GitBranch, CheckCircle, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pipelineStages = [
  { id: 1, name: 'Source', type: 'source', status: 'completed', duration: '0:05' },
  { id: 2, name: 'Build', type: 'build', status: 'completed', duration: '2:34' },
  { id: 3, name: 'Test', type: 'test', status: 'completed', duration: '1:45' },
  { id: 4, name: 'Security Scan', type: 'security', status: 'running', duration: '0:23' },
  { id: 5, name: 'Deploy to Staging', type: 'deploy', status: 'pending', duration: '-' },
  { id: 6, name: 'Integration Tests', type: 'test', status: 'pending', duration: '-' },
  { id: 7, name: 'Deploy to Production', type: 'deploy', status: 'pending', duration: '-' }
];

const availableStages = [
  { name: 'Code Quality', icon: CheckCircle, type: 'quality' },
  { name: 'Docker Build', icon: Settings, type: 'build' },
  { name: 'Performance Test', icon: CheckCircle, type: 'test' },
  { name: 'Compliance Check', icon: CheckCircle, type: 'security' }
];

export const PipelineBuilder = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500 animate-pulse';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStageTextColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'running': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Pipeline Builder</h3>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Pipeline
        </Button>
      </div>
      
      {/* Pipeline Visualization */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-foreground">main branch</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Pipeline #247</span>
        </div>
        
        <div className="space-y-3">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${getStageColor(stage.status)}`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{stage.name}</span>
                  <span className={`text-xs ${getStageTextColor(stage.status)}`}>
                    {stage.duration}
                  </span>
                </div>
                <div className={`text-xs capitalize ${getStageTextColor(stage.status)}`}>
                  {stage.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Stages */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Available Stages</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableStages.map((stage, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg border border-dashed border-border hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-2">
                <stage.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{stage.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
