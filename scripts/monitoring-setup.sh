#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}📊 Setting up monitoring stack...${NC}"

# Check if helm is installed
if ! command -v helm &> /dev/null; then
    echo -e "${RED}❌ Helm is not installed${NC}"
    exit 1
fi

# Add Helm repositories
echo -e "${YELLOW}📦 Adding Helm repositories...${NC}"
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Create monitoring namespace
echo -e "${YELLOW}🏗️  Creating monitoring namespace...${NC}"
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Install Prometheus
echo -e "${YELLOW}🔍 Installing Prometheus...${NC}"
helm upgrade --install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi \
  --set grafana.adminPassword=admin123 \
  --set grafana.persistence.enabled=true \
  --set grafana.persistence.size=10Gi

# Wait for Prometheus to be ready
echo -e "${YELLOW}⏳ Waiting for Prometheus to be ready...${NC}"
kubectl rollout status deployment/prometheus-kube-prometheus-grafana -n monitoring --timeout=300s

# Install Loki for log aggregation
echo -e "${YELLOW}📝 Installing Loki...${NC}"
helm upgrade --install loki grafana/loki-stack \
  --namespace monitoring \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=50Gi \
  --set promtail.enabled=true

# Create ServiceMonitor for our application
echo -e "${YELLOW}🎯 Creating ServiceMonitor...${NC}"
cat <<EOF | kubectl apply -f -
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: devops-agent-monitor
  namespace: monitoring
  labels:
    app: devops-agent
spec:
  selector:
    matchLabels:
      app: devops-agent-frontend
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
  namespaceSelector:
    matchNames:
    - devops-agent
EOF

# Port forward Grafana for access
echo -e "${YELLOW}🔗 Setting up Grafana access...${NC}"
kubectl port-forward svc/prometheus-kube-prometheus-grafana 3000:80 -n monitoring &
GRAFANA_PID=$!

echo -e "${GREEN}✅ Monitoring stack installed successfully!${NC}"
echo -e "${GREEN}🌐 Grafana is accessible at: http://localhost:3000${NC}"
echo -e "${GREEN}👤 Username: admin${NC}"
echo -e "${GREEN}🔑 Password: admin123${NC}"

# Cleanup function
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up port forwarding...${NC}"
    kill $GRAFANA_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

echo -e "${YELLOW}💡 Press Ctrl+C to stop port forwarding${NC}"
wait $GRAFANA_PID