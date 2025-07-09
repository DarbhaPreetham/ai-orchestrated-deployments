
import React from 'react';
import { Server, Cpu, HardDrive, Network, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const clusterNodes = [
  { name: 'master-1', status: 'ready', cpu: 45, memory: 62, pods: 15, maxPods: 20 },
  { name: 'worker-1', status: 'ready', cpu: 78, memory: 84, pods: 18, maxPods: 20 },
  { name: 'worker-2', status: 'ready', cpu: 23, memory: 34, pods: 8, maxPods: 20 },
  { name: 'worker-3', status: 'notready', cpu: 0, memory: 0, pods: 0, maxPods: 20 }
];

const namespaces = [
  { name: 'default', pods: 12, services: 5, status: 'active' },
  { name: 'kube-system', pods: 8, services: 3, status: 'active' },
  { name: 'monitoring', pods: 6, services: 2, status: 'active' },
  { name: 'ingress-nginx', pods: 3, services: 1, status: 'active' }
];

export const KubernetesCluster = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Kubernetes Cluster</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">v1.28.2</span>
        </div>
      </div>
      
      {/* Cluster Nodes */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Cluster Nodes</h4>
        <div className="space-y-3">
          {clusterNodes.map((node) => (
            <div key={node.name} className="p-3 rounded-lg bg-accent/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{node.name}</span>
                  {node.status === 'notready' && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  node.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {node.status}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">CPU</div>
                  <Progress value={node.cpu} className="h-1.5" />
                  <div className="text-xs text-muted-foreground mt-1">{node.cpu}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Memory</div>
                  <Progress value={node.memory} className="h-1.5" />
                  <div className="text-xs text-muted-foreground mt-1">{node.memory}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Pods</div>
                  <Progress value={(node.pods / node.maxPods) * 100} className="h-1.5" />
                  <div className="text-xs text-muted-foreground mt-1">{node.pods}/{node.maxPods}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Namespaces */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Namespaces</h4>
        <div className="grid grid-cols-2 gap-2">
          {namespaces.map((ns) => (
            <div key={ns.name} className="p-2 rounded bg-accent/20">
              <div className="text-sm font-medium text-foreground">{ns.name}</div>
              <div className="text-xs text-muted-foreground">
                {ns.pods} pods • {ns.services} services
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
