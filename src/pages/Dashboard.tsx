
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { InfrastructureOverview } from '@/components/dashboard/InfrastructureOverview';
import { SecurityStatus } from '@/components/dashboard/SecurityStatus';
import { PipelineStatus } from '@/components/dashboard/PipelineStatus';
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">DevOps Command Center</h1>
            <p className="text-muted-foreground">Monitor and manage your entire infrastructure ecosystem</p>
          </div>
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InfrastructureOverview />
            <SecurityStatus />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PipelineStatus />
            <ResourceUsage />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
