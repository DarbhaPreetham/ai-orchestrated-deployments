
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SecurityOverview } from '@/components/security/SecurityOverview';
import { VulnerabilityScanner } from '@/components/security/VulnerabilityScanner';
import { ComplianceStatus } from '@/components/security/ComplianceStatus';
import { SecurityPolicies } from '@/components/security/SecurityPolicies';

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Security Center</h1>
            <p className="text-muted-foreground">Comprehensive security monitoring and compliance</p>
          </div>
          
          <SecurityOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VulnerabilityScanner />
            <ComplianceStatus />
          </div>
          
          <SecurityPolicies />
        </main>
      </div>
    </div>
  );
};

export default Security;
