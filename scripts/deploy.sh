#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="devops-agent"
DOCKER_REGISTRY="ghcr.io"
IMAGE_NAME="devops-agent"
VERSION=${1:-latest}

echo -e "${GREEN}🚀 Starting DevOps Agent deployment...${NC}"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed or not in PATH${NC}"
    exit 1
fi

# Check if we're connected to a cluster
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Not connected to a Kubernetes cluster${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Current cluster context:${NC}"
kubectl config current-context

# Create namespace if it doesn't exist
echo -e "${YELLOW}🏗️  Creating namespace...${NC}"
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
echo -e "${YELLOW}📦 Applying Kubernetes manifests...${NC}"
kubectl apply -f k8s/ -n $NAMESPACE

# Wait for deployment to be ready
echo -e "${YELLOW}⏳ Waiting for deployment to be ready...${NC}"
kubectl rollout status deployment/devops-agent-frontend -n $NAMESPACE --timeout=300s

# Check if ingress is configured
if kubectl get ingress devops-agent-ingress -n $NAMESPACE &> /dev/null; then
    INGRESS_IP=$(kubectl get ingress devops-agent-ingress -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    if [ -n "$INGRESS_IP" ]; then
        echo -e "${GREEN}🌐 Application is accessible at: http://$INGRESS_IP${NC}"
    else
        echo -e "${YELLOW}⏳ Waiting for ingress IP to be assigned...${NC}"
    fi
else
    # Port forward for local access
    echo -e "${YELLOW}🔗 Setting up port forwarding for local access...${NC}"
    kubectl port-forward svc/devops-agent-frontend-service 8080:80 -n $NAMESPACE &
    PORT_FORWARD_PID=$!
    echo -e "${GREEN}🌐 Application is accessible at: http://localhost:8080${NC}"
    echo -e "${YELLOW}💡 Press Ctrl+C to stop port forwarding${NC}"
    
    # Cleanup function
    cleanup() {
        echo -e "${YELLOW}🧹 Cleaning up port forwarding...${NC}"
        kill $PORT_FORWARD_PID 2>/dev/null || true
        exit 0
    }
    
    trap cleanup SIGINT SIGTERM
    wait $PORT_FORWARD_PID
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"

# Show deployment status
echo -e "${YELLOW}📊 Deployment status:${NC}"
kubectl get pods -n $NAMESPACE
kubectl get services -n $NAMESPACE
kubectl get ingress -n $NAMESPACE 2>/dev/null || echo "No ingress configured"

echo -e "${GREEN}🎉 DevOps Agent is now running!${NC}"