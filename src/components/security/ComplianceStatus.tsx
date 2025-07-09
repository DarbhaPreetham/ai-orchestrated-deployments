
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, FileCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const complianceFrameworks = [
  { name: 'SOC 2 Type II', score: 98, status: 'compliant', controls: 64, passed: 63, failed: 1 },
  { name: 'ISO 27001', score: 94, status: 'compliant', controls: 114, passed: 107, failed: 7 },
  { name: 'GDPR', score: 89, status: 'partial', controls: 28, passed: 25, failed: 3 },
  { name: 'HIPAA', score: 91, status: 'compliant', controls: 45, passed: 41, failed: 4 },
  { name: 'PCI DSS', score: 87, status: 'partial', controls: 12, passed: 10, failed: 2 }
];

const recentAudits = [
  { framework: 'SOC 2', date: '2024-01-15', auditor: 'Deloitte', status: 'passed', score: 98 },
  { framework: 'ISO 27001', date: '2023-12-20', auditor: 'EY', status: 'passed', score: 94 },
  { framework: 'GDPR', date: '2023-11-10', auditor: 'Internal', status: 'review', score: 89 }
];

export const ComplianceStatus = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <FileCheck className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-gray-100';
    }
  };

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-muted-foreground bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Compliance Status</h3>
        </div>
        <span className="text-sm text-muted-foreground">Last assessed: Today</span>
      </div>
      
      {/* Compliance Frameworks */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Compliance Frameworks</h4>
        <div className="space-y-4">
          {complianceFrameworks.map((framework) => (
            <div key={framework.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(framework.status)}
                  <span className="font-medium text-foreground">{framework.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                    {framework.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-foreground">{framework.score}%</div>
              </div>
              <Progress value={framework.score} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{framework.passed} passed, {framework.failed} failed</span>
                <span>{framework.controls} total controls</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audits */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Audits</h4>
        <div className="space-y-2">
          {recentAudits.map((audit, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
              <div>
                <div className="font-medium text-foreground">{audit.framework}</div>
                <div className="text-xs text-muted-foreground">
                  {audit.date} • {audit.auditor}
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAuditStatusColor(audit.status)}`}>
                  {audit.status}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{audit.score}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
