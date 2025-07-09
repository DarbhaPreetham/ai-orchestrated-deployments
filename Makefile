.PHONY: help install build test lint clean docker-build docker-run k8s-deploy terraform-init terraform-plan terraform-apply setup-monitoring security-scan

# Default target
help:
	@echo "DevOps Agent - Available commands:"
	@echo ""
	@echo "Development:"
	@echo "  install          Install dependencies"
	@echo "  build            Build the application"
	@echo "  test             Run tests"
	@echo "  lint             Run linting"
	@echo "  clean            Clean build artifacts"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build     Build Docker image"
	@echo "  docker-run       Run Docker container"
	@echo "  docker-compose   Run with docker-compose"
	@echo ""
	@echo "Kubernetes:"
	@echo "  k8s-deploy       Deploy to Kubernetes"
	@echo "  k8s-delete       Delete from Kubernetes"
	@echo ""
	@echo "Infrastructure:"
	@echo "  terraform-init   Initialize Terraform"
	@echo "  terraform-plan   Plan infrastructure changes"
	@echo "  terraform-apply  Apply infrastructure changes"
	@echo "  setup-infra      Complete infrastructure setup"
	@echo ""
	@echo "Monitoring:"
	@echo "  setup-monitoring Install monitoring stack"
	@echo ""
	@echo "Security:"
	@echo "  security-scan    Run security scans"

# Development commands
install:
	npm install
	cd backend && npm install

build:
	npm run build
	cd backend && npm run build

test:
	npm test
	cd backend && npm test

lint:
	npm run lint
	cd backend && npm run lint

clean:
	rm -rf dist/
	rm -rf node_modules/
	rm -rf backend/dist/
	rm -rf backend/node_modules/

# Docker commands
docker-build:
	docker build -f docker/Dockerfile -t devops-agent:latest .
	cd backend && docker build -t devops-agent-backend:latest .

docker-run:
	docker run -p 8080:80 devops-agent:latest

docker-compose:
	docker-compose up -d

docker-compose-down:
	docker-compose down -v

# Kubernetes commands
k8s-deploy:
	./scripts/deploy.sh

k8s-delete:
	kubectl delete -f k8s/ -n devops-agent || true
	kubectl delete namespace devops-agent || true

# Infrastructure commands
terraform-init:
	cd terraform && terraform init

terraform-plan:
	cd terraform && terraform plan

terraform-apply:
	cd terraform && terraform apply

setup-infra:
	./scripts/setup-infrastructure.sh

# Monitoring
setup-monitoring:
	./scripts/monitoring-setup.sh

# Security
security-scan:
	./scripts/security-scan.sh

# Complete setup
setup-all: setup-infra k8s-deploy setup-monitoring
	@echo "✅ Complete setup finished!"
	@echo "🌐 Your DevOps Agent platform is ready!"

# Development environment
dev-setup: install build docker-compose
	@echo "✅ Development environment ready!"
	@echo "🌐 Frontend: http://localhost:8080"
	@echo "🔧 Backend: http://localhost:3000"
	@echo "📊 Grafana: http://localhost:3001"