
import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const securityMetrics = [
  { name: 'Critical Vulnerabilities', count: 0, status: 'safe', icon: CheckCircle, color: 'text-green-600' },
  { name: 'High Risk Issues', count: 3, status: 'warning', icon: AlertTriangle, color: 'text-yellow-600' },
  { name: 'Medium Risk Issues', count: 12, status: 'caution', icon: AlertTriangle, color: 'text-orange-600' },
  { name: 'Compliance Violations', count: 1, status: 'danger', icon: XCircle, color: 'text-red-600' }
];

export const SecurityStatus = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security Dashboard</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-600">94%</span>
          <span className="text-sm text-muted-foreground">Score</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Security Health</span>
          <span className="text-foreground font-medium">Excellent</span>
        </div>
        <Progress value={94} className="h-2" />
      </div>
      
      <div className="space-y-3">
        {securityMetrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
            <div className="flex items-center space-x-3">
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
              <span className="font-medium text-foreground">{metric.name}</span>
            </div>
            <div className={`text-lg font-semibold ${metric.color}`}>
              {metric.count}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800 dark:text-green-200">
            All critical security controls are active and functioning
          </span>
        </div>
      </div>
    </div>
  );
};
