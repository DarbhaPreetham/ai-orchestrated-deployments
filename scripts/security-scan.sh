#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔒 Running security scans...${NC}"

# Check if trivy is installed
if ! command -v trivy &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Trivy...${NC}"
    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
fi

# Scan filesystem for vulnerabilities
echo -e "${YELLOW}🔍 Scanning filesystem for vulnerabilities...${NC}"
trivy fs --security-checks vuln,config,secret --format table .

# Scan Docker image if it exists
if docker images devops-agent:latest &> /dev/null; then
    echo -e "${YELLOW}🐳 Scanning Docker image for vulnerabilities...${NC}"
    trivy image --security-checks vuln,config,secret devops-agent:latest
fi

# Scan Kubernetes manifests
echo -e "${YELLOW}☸️  Scanning Kubernetes manifests...${NC}"
trivy config k8s/

# Check for secrets in git history
echo -e "${YELLOW}🔐 Checking for secrets in git history...${NC}"
if command -v git-secrets &> /dev/null; then
    git secrets --scan-history
else
    echo -e "${YELLOW}⚠️  git-secrets not installed, skipping secret scan${NC}"
fi

# Run kubebench if in Kubernetes environment
if kubectl cluster-info &> /dev/null; then
    echo -e "${YELLOW}🛡️  Running CIS Kubernetes Benchmark...${NC}"
    kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
    
    # Wait for job to complete
    kubectl wait --for=condition=complete job/kube-bench --timeout=300s
    
    # Get results
    kubectl logs job/kube-bench
    
    # Cleanup
    kubectl delete job kube-bench
fi

echo -e "${GREEN}✅ Security scan completed!${NC}"