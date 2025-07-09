#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🏗️  Setting up DevOps Agent infrastructure...${NC}"

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Terraform is not installed${NC}"
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed${NC}"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"

# Initialize Terraform
echo -e "${YELLOW}🚀 Initializing Terraform...${NC}"
cd terraform
terraform init

# Create terraform.tfvars if it doesn't exist
if [ ! -f terraform.tfvars ]; then
    echo -e "${YELLOW}📝 Creating terraform.tfvars...${NC}"
    cat > terraform.tfvars << EOF
aws_region = "us-west-2"
environment = "production"
project_name = "devops-agent"
cluster_name = "devops-agent-cluster"
db_password = "$(openssl rand -base64 32)"
EOF
    echo -e "${GREEN}✅ terraform.tfvars created${NC}"
fi

# Plan infrastructure
echo -e "${YELLOW}📋 Planning infrastructure...${NC}"
terraform plan

# Ask for confirmation
echo -e "${YELLOW}❓ Do you want to apply these changes? (y/N)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${YELLOW}🏗️  Applying infrastructure changes...${NC}"
    terraform apply -auto-approve
    
    # Update kubeconfig
    echo -e "${YELLOW}⚙️  Updating kubeconfig...${NC}"
    aws eks update-kubeconfig --region us-west-2 --name devops-agent-cluster
    
    echo -e "${GREEN}✅ Infrastructure setup completed!${NC}"
    
    # Show outputs
    echo -e "${YELLOW}📊 Infrastructure outputs:${NC}"
    terraform output
else
    echo -e "${YELLOW}⏹️  Infrastructure setup cancelled${NC}"
fi

cd ..