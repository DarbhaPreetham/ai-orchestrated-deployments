
import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Scan } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const securityMetrics = [
  {
    title: 'Security Score',
    value: '94',
    unit: '/100',
    change: '+3',
    changeType: 'positive',
    icon: Shield,
    description: 'Overall security posture'
  },
  {
    title: 'Critical Vulnerabilities',
    value: '0',
    unit: '',
    change: '-2',
    changeType: 'positive',
    icon: XCircle,
    description: 'Require immediate attention'
  },
  {
    title: 'Compliance Score',
    value: '98%',
    unit: '',
    change: '+1%',
    changeType: 'positive',
    icon: CheckCircle,
    description: 'SOC2, ISO27001, GDPR'
  },
  {
    title: 'Active Scans',
    value: '12',
    unit: '',
    change: '+3',
    changeType: 'neutral',
    icon: Scan,
    description: 'Running security scans'
  }
];

const riskCategories = [
  { name: 'Infrastructure', level: 'low', score: 92, issues: 2 },
  { name: 'Application', level: 'medium', score: 78, issues: 8 },
  { name: 'Network', level: 'low', score: 95, issues: 1 },
  { name: 'Identity & Access', level: 'low', score: 88, issues: 3 },
  { name: 'Data Protection', level: 'high', score: 65, issues: 12 }
];

export const SecurityOverview = () => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => (
          <div key={metric.title} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
              }`}>
                {metric.changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-foreground">
                {metric.value}{metric.unit}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Assessment */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
          <span className="text-sm text-muted-foreground">Last updated: 5 minutes ago</span>
        </div>
        
        <div className="space-y-4">
          {riskCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-foreground">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(category.level)}`}>
                    {category.level} risk
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-foreground">{category.score}/100</span>
                  <div className="text-xs text-muted-foreground">{category.issues} issues</div>
                </div>
              </div>
              <Progress value={category.score} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
