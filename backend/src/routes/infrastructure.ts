import express from 'express';
import { logger } from '../utils/logger';

const router = express.Router();

// Mock data for demonstration
const mockCloudProviders = [
  {
    name: 'Amazon Web Services',
    short: 'AWS',
    status: 'active',
    resources: 89,
    cost: '$4,320',
    regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
    services: ['EC2', 'RDS', 'S3', 'Lambda', 'ELB']
  },
  {
    name: 'Microsoft Azure',
    short: 'Azure',
    status: 'active',
    resources: 45,
    cost: '$2,890',
    regions: ['eastus', 'westeurope', 'southeastasia'],
    services: ['VMs', 'SQL DB', 'Blob', 'Functions', 'App Gateway']
  },
  {
    name: 'Google Cloud Platform',
    short: 'GCP',
    status: 'active',
    resources: 32,
    cost: '$1,650',
    regions: ['us-central1', 'europe-west1', 'asia-southeast1'],
    services: ['Compute', 'Cloud SQL', 'Storage', 'Functions', 'Load Balancer']
  }
];

router.get('/providers', (req, res) => {
  res.json(mockCloudProviders);
});

router.get('/topology', (req, res) => {
  const topology = {
    nodes: [
      { id: 'lb1', name: 'Load Balancer', type: 'loadbalancer', status: 'healthy' },
      { id: 'web1', name: 'Web Server 1', type: 'server', status: 'healthy' },
      { id: 'web2', name: 'Web Server 2', type: 'server', status: 'healthy' },
      { id: 'app1', name: 'App Server 1', type: 'server', status: 'healthy' },
      { id: 'app2', name: 'App Server 2', type: 'server', status: 'warning' },
      { id: 'db1', name: 'Database', type: 'database', status: 'healthy' }
    ],
    connections: [
      { from: 'lb1', to: 'web1' },
      { from: 'lb1', to: 'web2' },
      { from: 'web1', to: 'app1' },
      { from: 'web2', to: 'app2' },
      { from: 'app1', to: 'db1' },
      { from: 'app2', to: 'db1' }
    ]
  };
  
  res.json(topology);
});

router.get('/metrics', (req, res) => {
  const metrics = {
    health: 98.2,
    performance: 89,
    storage: 76,
    latency: 12
  };
  
  res.json(metrics);
});

router.get('/autoscaling', (req, res) => {
  const autoscalingGroups = [
    {
      name: 'Web Tier Auto Scaling',
      provider: 'AWS',
      currentInstances: 4,
      minInstances: 2,
      maxInstances: 10,
      targetUtilization: 70,
      currentUtilization: 68,
      status: 'active'
    }
  ];
  
  res.json(autoscalingGroups);
});

export default router;