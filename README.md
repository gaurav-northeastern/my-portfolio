# Senior Software Engineer Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This project is based on the [Figma design](https://www.figma.com/design/IBZmnOBAkD61bcwh6NtF2N/Senior-Software-Engineer-Portfolio-Website--Community-).

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Nginx** - Production web server (Docker)

## Prerequisites

Choose one of the following:

### Option 1: Without Docker
- Node.js 20 or higher
- npm or yarn

### Option 2: With Docker
- Docker Desktop or Docker Engine
- docker-compose (included with Docker Desktop)

---

## Getting Started

### Method 1: Without Docker (Traditional)

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### 3. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

#### 4. Preview Production Build
```bash
npm run preview
```

---

### Method 2: With Docker (Recommended)

Docker provides a consistent environment and makes deployment easier.

#### Development Mode (with hot-reload)

Run the development server with live reloading:

```bash
docker-compose --profile dev up portfolio-dev
```

Access the app at `http://localhost:5173`

To stop the server:
```bash
docker-compose --profile dev down
```

#### Production Mode (with Nginx)

Build and run the production-optimized container:

```bash
docker-compose up portfolio-prod
```

Or run in detached mode (background):
```bash
docker-compose up -d portfolio-prod
```

Access the app at `http://localhost:8080`

To stop and remove the container:
```bash
docker-compose down
```

#### Using Docker CLI Directly

Build the image:
```bash
docker build -t portfolio-website .
```

Run the container:
```bash
docker run -d -p 8080:80 --name portfolio portfolio-website
```

Stop and remove:
```bash
docker stop portfolio
docker rm portfolio
```

---

## Project Structure

```
.
├── src/                    # Source files
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── styles/           # CSS and Tailwind styles
│   └── App.tsx           # Main App component
├── public/               # Static assets
├── build/                # Production build output
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── nginx.conf           # Nginx server configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Create production build in `build/` directory |

## Docker Details

### Multi-Stage Build

The Dockerfile uses a two-stage build process:

1. **Builder Stage**: Compiles the React app using Node.js
2. **Production Stage**: Serves static files with Nginx Alpine (~25MB)

### Features

- Optimized production build
- Gzip compression
- Security headers
- Static asset caching
- Health checks
- SPA routing support

### Viewing Logs

```bash
# With docker-compose
docker-compose logs portfolio-prod

# Follow logs
docker-compose logs -f portfolio-prod

# With docker CLI
docker logs portfolio
```

### Rebuilding After Changes

```bash
# Rebuild and start
docker-compose up --build portfolio-prod

# Or force rebuild
docker-compose build --no-cache portfolio-prod
```

## Deployment

### AWS Deployment (GitHub Actions)

This project includes a GitHub Actions workflow that:
1. Builds a Docker image
2. Pushes to Amazon ECR
3. Deploys static files to S3
4. Invalidates CloudFront cache

#### Setup AWS Deployment

1. Create an ECR repository:
```bash
aws ecr create-repository \
  --repository-name portfolio-website \
  --region us-east-1
```

2. Add these GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `S3_BUCKET_NAME`
   - `CLOUDFRONT_DISTRIBUTION_ID`

3. Push to main branch to trigger deployment

See [.github/workflows/deploy.yml](.github/workflows/deploy.yml) for details.

### Other Deployment Options

#### Deploy to Any Server

1. Build the Docker image
2. Push to your container registry
3. Pull and run on your server:

```bash
docker pull your-registry/portfolio-website:latest
docker run -d -p 80:80 portfolio-website:latest
```

#### Deploy Static Files

Build and deploy the static files:

```bash
npm run build
# Upload contents of build/ directory to your hosting provider
```

## Customization

### Change Ports

Edit `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Use port 3000 instead of 8080
```

### Modify Nginx Configuration

Edit `nginx.conf` to customize:
- Caching policies
- Security headers
- Compression settings
- Routing rules

## Troubleshooting

### Port Already in Use

Change the port in `docker-compose.yml` or stop the conflicting service:

```bash
# Find what's using the port
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Docker Build Fails

Clear Docker cache and rebuild:

```bash
docker system prune -a
docker-compose build --no-cache
```

### Node Modules Issues (Without Docker)

Delete and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker: `docker-compose up --build`
5. Submit a pull request

## License

This project is based on the community Figma design and is available for portfolio use.

## Resources

- [Original Figma Design](https://www.figma.com/design/IBZmnOBAkD61bcwh6NtF2N/Senior-Software-Engineer-Portfolio-Website--Community-)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Docker Documentation](https://docs.docker.com)

## Support

For issues or questions:
- Open an issue in the GitHub repository
- Check the [DOCKER.md](DOCKER.md) for detailed Docker documentation
# Test
# Test
