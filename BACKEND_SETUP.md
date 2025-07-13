# Backend Setup Guide

This guide will help you set up and extend the backend functionality of the AI-Orchestrated DevOps Agent.

## 🎯 Current Backend Status

The backend currently provides:
- ✅ Basic Express server setup
- ✅ Authentication middleware
- ✅ Mock API endpoints
- ✅ Database schema (Supabase)
- ✅ Docker configuration
- ⚠️ **Needs Implementation**: Real cloud provider integrations
- ⚠️ **Needs Implementation**: Actual data persistence
- ⚠️ **Needs Implementation**: Real-time WebSocket features

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database (Supabase)
DATABASE_URL=postgresql://username:password@localhost:5432/devopsagent
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Cloud Providers
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-west-2

AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
AZURE_TENANT_ID=your-azure-tenant-id

GCP_PROJECT_ID=your-gcp-project-id
GCP_CLIENT_EMAIL=your-gcp-client-email
GCP_PRIVATE_KEY=your-gcp-private-key

# Monitoring
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3001
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Database Setup

The project uses Supabase for the database. The schema is already defined in:
`supabase/migrations/20250709155401_empty_beacon.sql`

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 🔧 Implementation Roadmap

### Phase 1: Core Infrastructure (High Priority)

#### 1.1 Database Integration
```typescript
// Example: Implement real database operations
// File: src/services/database.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class DatabaseService {
  async getInfrastructureResources() {
    const { data, error } = await supabase
      .from('infrastructure_resources')
      .select('*');
    
    if (error) throw error;
    return data;
  }
  
  async createResource(resource: any) {
    const { data, error } = await supabase
      .from('infrastructure_resources')
      .insert(resource)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}
```

#### 1.2 Cloud Provider Integration
```typescript
// Example: AWS EC2 Integration
// File: src/services/aws.ts

import AWS from 'aws-sdk';

export class AWSService {
  private ec2: AWS.EC2;
  
  constructor() {
    this.ec2 = new AWS.EC2({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }
  
  async listInstances() {
    const result = await this.ec2.describeInstances().promise();
    return result.Reservations?.flatMap(r => r.Instances) || [];
  }
  
  async createInstance(params: any) {
    return await this.ec2.runInstances(params).promise();
  }
}
```

#### 1.3 Authentication System
```typescript
// Example: Enhanced authentication
// File: src/services/auth.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { DatabaseService } from './database';

export class AuthService {
  private db = new DatabaseService();
  
  async login(username: string, password: string) {
    const user = await this.db.getUserByUsername(username);
    if (!user) throw new Error('User not found');
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new Error('Invalid password');
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    return { token, user };
  }
}
```

### Phase 2: Real-time Features

#### 2.1 WebSocket Implementation
```typescript
// Example: Real-time metrics
// File: src/services/websocket.ts

import { Server as SocketIOServer } from 'socket.io';
import { MetricsService } from './metrics';

export class WebSocketService {
  private io: SocketIOServer;
  private metricsService = new MetricsService();
  
  constructor(io: SocketIOServer) {
    this.io = io;
    this.setupEventHandlers();
    this.startMetricsStreaming();
  }
  
  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      socket.on('subscribe-metrics', (resourceId) => {
        socket.join(`metrics-${resourceId}`);
      });
    });
  }
  
  private startMetricsStreaming() {
    setInterval(async () => {
      const metrics = await this.metricsService.getCurrentMetrics();
      this.io.emit('metrics-update', metrics);
    }, 5000);
  }
}
```

### Phase 3: Advanced Features

#### 3.1 Container Management
```typescript
// Example: Kubernetes integration
// File: src/services/kubernetes.ts

import * as k8s from '@kubernetes/client-node';

export class KubernetesService {
  private k8sApi: k8s.CoreV1Api;
  
  constructor() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  }
  
  async listPods(namespace = 'default') {
    const response = await this.k8sApi.listNamespacedPod(namespace);
    return response.body.items;
  }
  
  async createDeployment(deployment: any) {
    // Implementation for creating deployments
  }
}
```

#### 3.2 Security Scanning
```typescript
// Example: Vulnerability scanning
// File: src/services/security.ts

export class SecurityService {
  async scanContainer(imageId: string) {
    // Implement container vulnerability scanning
    // Integration with tools like Trivy, Clair, etc.
  }
  
  async checkCompliance(resourceId: string) {
    // Implement compliance checking
    // SOC2, ISO27001, GDPR, etc.
  }
  
  async generateSecurityReport() {
    // Generate comprehensive security reports
  }
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   ├── services/            # Business logic
│   ├── middleware/          # Express middleware
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── tests/                  # Test files
├── docs/                   # API documentation
└── scripts/               # Utility scripts
```

## 🔌 API Endpoints to Implement

### Infrastructure Management
```
GET    /api/infrastructure/resources
POST   /api/infrastructure/resources
PUT    /api/infrastructure/resources/:id
DELETE /api/infrastructure/resources/:id
GET    /api/infrastructure/topology
GET    /api/infrastructure/metrics
```

### Container Management
```
GET    /api/containers/clusters
GET    /api/containers/pods
POST   /api/containers/deploy
GET    /api/containers/registry/images
POST   /api/containers/registry/push
```

### Pipeline Management
```
GET    /api/pipelines
POST   /api/pipelines
GET    /api/pipelines/:id/runs
POST   /api/pipelines/:id/trigger
GET    /api/pipelines/:id/logs
```

### Security
```
GET    /api/security/vulnerabilities
POST   /api/security/scan
GET    /api/security/compliance
GET    /api/security/policies
```

### Monitoring
```
GET    /api/monitoring/metrics
GET    /api/monitoring/alerts
POST   /api/monitoring/alerts
GET    /api/monitoring/dashboards
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Example test
// File: tests/services/auth.test.ts

import { AuthService } from '../src/services/auth';

describe('AuthService', () => {
  let authService: AuthService;
  
  beforeEach(() => {
    authService = new AuthService();
  });
  
  it('should authenticate valid user', async () => {
    const result = await authService.login('admin', 'password');
    expect(result.token).toBeDefined();
    expect(result.user.username).toBe('admin');
  });
});
```

### Integration Tests
```typescript
// Example integration test
// File: tests/integration/api.test.ts

import request from 'supertest';
import app from '../src/server';

describe('Infrastructure API', () => {
  it('should get infrastructure resources', async () => {
    const response = await request(app)
      .get('/api/infrastructure/resources')
      .set('Authorization', 'Bearer valid-token');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
```

## 📊 Monitoring & Logging

### Prometheus Metrics
```typescript
// Example: Custom metrics
// File: src/utils/metrics.ts

import client from 'prom-client';

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

export const activeConnections = new client.Gauge({
  name: 'websocket_active_connections',
  help: 'Number of active WebSocket connections'
});
```

### Structured Logging
```typescript
// Example: Enhanced logging
// File: src/utils/logger.ts

import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'devops-agent-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

## 🚀 Deployment

### Docker
```dockerfile
# Production Dockerfile is already included
# Build: docker build -t devops-agent-backend .
# Run: docker run -p 3000:3000 devops-agent-backend
```

### Kubernetes
```yaml
# Example deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-agent-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-agent-backend
  template:
    metadata:
      labels:
        app: devops-agent-backend
    spec:
      containers:
      - name: backend
        image: devops-agent-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

## 🤝 Contributing to Backend

1. **Choose a feature** from the roadmap
2. **Create a branch** for your feature
3. **Implement** following the patterns shown
4. **Add tests** for your implementation
5. **Update documentation**
6. **Submit a pull request**

### Priority Areas for Contribution

1. **Cloud Provider APIs** - AWS, Azure, GCP integrations
2. **Database Operations** - Supabase integration
3. **Real-time Features** - WebSocket implementation
4. **Security Features** - Vulnerability scanning, compliance
5. **Monitoring** - Metrics collection, alerting
6. **Testing** - Unit tests, integration tests

## 📚 Learning Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [AWS SDK Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)
- [Kubernetes Client Documentation](https://github.com/kubernetes-client/javascript)

---

**Ready to contribute? Pick a feature and start building! 🚀**