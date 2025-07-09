
import React from 'react';
import { Shield, FileText, Users, Key, Lock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const securityPolicies = [
  {
    category: 'Access Control',
    icon: Key,
    policies: [
      { name: 'Multi-Factor Authentication', status: 'enforced', coverage: 100 },
      { name: 'Role-Based Access Control', status: 'enforced', coverage: 100 },
      { name: 'Privileged Access Management', status: 'enforced', coverage: 85 },
      { name: 'Session Management', status: 'active', coverage: 92 }
    ]
  },
  {
    category: 'Data Protection',
    icon: Lock,
    policies: [
      { name: 'Data Encryption at Rest', status: 'enforced', coverage: 100 },
      { name: 'Data Encryption in Transit', status: 'enforced', coverage: 100 },
      { name: 'Data Loss Prevention', status: 'active', coverage: 78 },
      { name: 'Backup Encryption', status: 'enforced', coverage: 100 }
    ]
  },
  {
    category: 'Network Security',
    icon: Shield,
    policies: [
      { name: 'Firewall Rules', status: 'enforced', coverage: 100 },
      { name: 'Intrusion Detection', status: 'active', coverage: 89 },
      { name: 'Network Segmentation', status: 'enforced', coverage: 95 },
      { name: 'VPN Access Control', status: 'enforced', coverage: 100 }
    ]
  }
];

const policyViolations = [
  { policy: 'Password Complexity', severity: 'medium', count: 12, trend: 'decreasing' },
  { policy: 'Unused Service Accounts', severity: 'low', count: 8, trend: 'stable' },
  { policy: 'Overprivileged Users', severity: 'high', count: 3, trend: 'decreasing' },
  { policy: 'Unencrypted Data', severity: 'critical', count: 1, trend: 'new' }
];

export const SecurityPolicies = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enforced': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Policies */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Security Policies</h3>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Manage Policies
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {securityPolicies.map((category) => (
            <div key={category.category} className="space-y-4">
              <div className="flex items-center space-x-2">
                <category.icon className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">{category.category}</h4>
              </div>
              
              <div className="space-y-3">
                {category.policies.map((policy) => (
                  <div key={policy.name} className="p-3 rounded-lg bg-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{policy.name}</span>
                      {getStatusIcon(policy.status)}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground capitalize">{policy.status}</span>
                      <span className="text-foreground">{policy.coverage}% coverage</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Violations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Policy Violations</h3>
          <span className="text-sm text-muted-foreground">Last 7 days</span>
        </div>
        
        <div className="space-y-3">
          {policyViolations.map((violation, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                  {violation.severity}
                </div>
                <span className="font-medium text-foreground">{violation.policy}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground">{violation.count} violations</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  violation.trend === 'decreasing' ? 'bg-green-100 text-green-700' :
                  violation.trend === 'increasing' ? 'bg-red-100 text-red-700' :
                  violation.trend === 'new' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {violation.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
