
import React from 'react';
import { Clock, GitCommit, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const pipelineRuns = [
  {
    id: '#247',
    branch: 'main',
    commit: 'a1b2c3d',
    message: 'Add user authentication feature',
    user: 'john.doe',
    status: 'success',
    duration: '4m 32s',
    timestamp: '2 minutes ago',
    stages: { passed: 7, failed: 0, total: 7 }
  },
  {
    id: '#246',
    branch: 'feature/payments',
    commit: 'x4y5z6a',
    message: 'Implement payment gateway integration',
    user: 'jane.smith',
    status: 'running',
    duration: '2m 15s',
    timestamp: '5 minutes ago',
    stages: { passed: 4, failed: 0, total: 7 }
  },
  {
    id: '#245',
    branch: 'hotfix/security',
    commit: 'p7q8r9s',
    message: 'Fix security vulnerability in auth module',
    user: 'mike.wilson',
    status: 'failed',
    duration: '1m 45s',
    timestamp: '1 hour ago',
    stages: { passed: 3, failed: 1, total: 7 }
  },
  {
    id: '#244',
    branch: 'develop',
    commit: 't1u2v3w',
    message: 'Update dependencies and fix tests',
    user: 'sarah.connor',
    status: 'success',
    duration: '6m 12s',
    timestamp: '3 hours ago',
    stages: { passed: 7, failed: 0, total: 7 }
  }
];

export const PipelineHistory = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running': return <AlertCircle className="h-5 w-5 text-blue-600 animate-pulse" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'running': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Pipeline History</h3>
        <span className="text-sm text-muted-foreground">Last 24 hours</span>
      </div>
      
      <div className="space-y-4">
        {pipelineRuns.map((run) => (
          <div key={run.id} className="p-4 rounded-lg border border-border bg-accent/10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(run.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{run.id}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{run.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <GitCommit className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">{run.commit}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-foreground">{run.message}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                  {run.status}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{run.duration}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-3 w-3" />
                <span>{run.user}</span>
                <span>•</span>
                <span>{run.timestamp}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>{run.stages.passed}</span>
                {run.stages.failed > 0 && (
                  <>
                    <XCircle className="h-3 w-3 text-red-600 ml-2" />
                    <span>{run.stages.failed}</span>
                  </>
                )}
                <span className="ml-1">/ {run.stages.total} stages</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
