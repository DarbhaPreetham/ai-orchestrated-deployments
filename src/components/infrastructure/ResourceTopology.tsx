
import React from 'react';
import { Network, Server, Database, Globe, Cpu, HardDrive } from 'lucide-react';

const topologyNodes = [
  { id: 'lb1', name: 'Load Balancer', type: 'loadbalancer', icon: Globe, x: 200, y: 50, status: 'healthy' },
  { id: 'web1', name: 'Web Server 1', type: 'server', icon: Server, x: 100, y: 150, status: 'healthy' },
  { id: 'web2', name: 'Web Server 2', type: 'server', icon: Server, x: 300, y: 150, status: 'healthy' },
  { id: 'app1', name: 'App Server 1', type: 'server', icon: Cpu, x: 100, y: 250, status: 'healthy' },
  { id: 'app2', name: 'App Server 2', type: 'server', icon: Cpu, x: 300, y: 250, status: 'warning' },
  { id: 'db1', name: 'Database', type: 'database', icon: Database, x: 200, y: 350, status: 'healthy' },
  { id: 'cache', name: 'Redis Cache', type: 'cache', icon: HardDrive, x: 50, y: 350, status: 'healthy' }
];

const connections = [
  { from: 'lb1', to: 'web1' },
  { from: 'lb1', to: 'web2' },
  { from: 'web1', to: 'app1' },
  { from: 'web2', to: 'app2' },
  { from: 'app1', to: 'db1' },
  { from: 'app2', to: 'db1' },
  { from: 'app1', to: 'cache' },
  { from: 'app2', to: 'cache' }
];

export const ResourceTopology = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Network className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Resource Topology</h3>
        </div>
        <span className="text-sm text-muted-foreground">Live View</span>
      </div>
      
      <div className="relative h-96 bg-accent/10 rounded-lg overflow-hidden">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {connections.map((conn, index) => {
            const fromNode = topologyNodes.find(n => n.id === conn.from);
            const toNode = topologyNodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                opacity="0.3"
              />
            );
          })}
        </svg>
        
        {/* Nodes */}
        {topologyNodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y, zIndex: 2 }}
          >
            <div className={`p-3 rounded-lg border-2 ${getStatusColor(node.status)} transition-all hover:scale-110 cursor-pointer`}>
              <node.icon className="h-6 w-6" />
            </div>
            <div className="text-xs text-center mt-1 text-foreground font-medium bg-background/80 rounded px-2 py-1">
              {node.name}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Healthy</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>
        <span className="text-muted-foreground">Auto-refresh: 30s</span>
      </div>
    </div>
  );
};
