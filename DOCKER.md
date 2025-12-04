# Docker Setup Guide

This project has been containerized using Docker for easy deployment and consistent environments.

## Quick Start

### Using Docker Compose (Recommended)

#### Production Mode
```bash
# Build and run the production container
docker-compose up portfolio-prod

# Or run in detached mode
docker-compose up -d portfolio-prod
```

The application will be available at `http://localhost:8080`

#### Development Mode
```bash
# Run with hot-reload for development
docker-compose --profile dev up portfolio-dev
```

The development server will be available at `http://localhost:5173`

### Using Docker CLI

#### Build the Image
```bash
docker build -t portfolio-website .
```

#### Run the Container
```bash
docker run -d -p 8080:80 --name portfolio portfolio-website
```

#### Stop and Remove Container
```bash
docker stop portfolio
docker rm portfolio
```

## Docker Architecture

### Multi-Stage Build

The Dockerfile uses a multi-stage build process:

1. **Builder Stage** (node:20-alpine)
   - Installs dependencies
   - Builds the Vite application
   - Creates optimized production assets

2. **Production Stage** (nginx:alpine)
   - Serves static files with Nginx
   - Minimal image size (~25MB)
   - Production-ready configuration

### Nginx Configuration

The `nginx.conf` includes:
- Gzip compression for better performance
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Static asset caching (1 year)
- SPA routing support (redirects to index.html)
- Health check endpoint

## GitHub Actions Deployment

The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) now:

1. Builds a Docker image
2. Pushes to Amazon ECR (Elastic Container Registry)
3. Extracts static files from the image
4. Deploys to S3 + CloudFront

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket for hosting
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID

### AWS Setup

Before using the GitHub Actions workflow, create an ECR repository:

```bash
aws ecr create-repository \
  --repository-name portfolio-website \
  --region us-east-1
```

## Local Development

### Without Docker
```bash
npm install
npm run dev
```

### With Docker (Hot Reload)
```bash
docker-compose --profile dev up portfolio-dev
```

## Testing the Production Build Locally

```bash
# Build and run
docker-compose up portfolio-prod

# Visit http://localhost:8080
```

## Health Checks

The container includes a health check that pings the server every 30 seconds:

```bash
# Check container health status
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' portfolio-website
```

## Troubleshooting

### Port Already in Use
```bash
# Change the port mapping in docker-compose.yml
ports:
  - "3000:80"  # Use port 3000 instead
```

### View Container Logs
```bash
docker logs portfolio-website

# Follow logs
docker logs -f portfolio-website
```

### Rebuild After Changes
```bash
# Rebuild the image
docker-compose build portfolio-prod

# Or force rebuild
docker-compose up --build portfolio-prod
```

### Clean Up
```bash
# Stop and remove all containers
docker-compose down

# Remove images
docker rmi portfolio-website

# Remove all unused Docker resources
docker system prune -a
```

## Image Size Optimization

The production image is optimized:
- Multi-stage build removes build dependencies
- Alpine Linux base (~5MB)
- Only includes production files
- Nginx for efficient static file serving

Expected final image size: ~25-30MB

## Security Best Practices

The setup includes:
- Non-root user execution in Nginx
- Security headers in nginx.conf
- No sensitive data in the image
- `.dockerignore` to exclude secrets
- Health checks for monitoring

## CI/CD Pipeline

The GitHub Actions workflow:
1. Builds for multiple architectures (amd64, arm64)
2. Tags with commit SHA and `latest`
3. Pushes to ECR
4. Deploys static files to S3
5. Invalidates CloudFront cache

This ensures consistent builds and reproducible deployments.
