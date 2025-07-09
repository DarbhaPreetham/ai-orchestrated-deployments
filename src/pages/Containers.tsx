
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ContainerOverview } from '@/components/containers/ContainerOverview';
import { KubernetesCluster } from '@/components/containers/KubernetesCluster';
import { DockerRegistry } from '@/components/containers/DockerRegistry';
import { ContainerMetrics } from '@/components/containers/ContainerMetrics';

const Containers = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Container Management</h1>
            <p className="text-muted-foreground">Docker and Kubernetes orchestration dashboard</p>
          </div>
          
          <ContainerOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <KubernetesCluster />
            <DockerRegistry />
          </div>
          
          <ContainerMetrics />
        </main>
      </div>
    </div>
  );
};

export default Containers;
