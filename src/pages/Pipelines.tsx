
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { PipelineBuilder } from '@/components/pipelines/PipelineBuilder';
import { PipelineHistory } from '@/components/pipelines/PipelineHistory';
import { DeploymentStrategies } from '@/components/pipelines/DeploymentStrategies';
import { PipelineMetrics } from '@/components/pipelines/PipelineMetrics';

const Pipelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">CI/CD Pipelines</h1>
            <p className="text-muted-foreground">Automated deployment and continuous integration</p>
          </div>
          
          <PipelineMetrics />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PipelineBuilder />
            <DeploymentStrategies />
          </div>
          
          <PipelineHistory />
        </main>
      </div>
    </div>
  );
};

export default Pipelines;
