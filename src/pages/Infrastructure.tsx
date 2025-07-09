
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { CloudProviders } from '@/components/infrastructure/CloudProviders';
import { ResourceTopology } from '@/components/infrastructure/ResourceTopology';
import { InfrastructureMetrics } from '@/components/infrastructure/InfrastructureMetrics';
import { AutoScaling } from '@/components/infrastructure/AutoScaling';

const Infrastructure = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Infrastructure Management</h1>
            <p className="text-muted-foreground">Multi-cloud infrastructure orchestration and monitoring</p>
          </div>
          
          <CloudProviders />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceTopology />
            <InfrastructureMetrics />
          </div>
          
          <AutoScaling />
        </main>
      </div>
    </div>
  );
};

export default Infrastructure;
