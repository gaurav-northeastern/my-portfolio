# CI/CD Setup Guide - Docker Hub Deployment

This guide explains how to set up GitHub Actions to automatically build and push your Docker image to Docker Hub.

## Overview

Your repository now has **two GitHub Actions workflows**:

1. **`docker-deploy.yml`** - Deploys to Docker Hub ✅ **[NEW - USE THIS]**
2. **`deploy.yml`** - Deploys to AWS ECR/S3/CloudFront (your old workflow)

---

## 🚀 Quick Start - Docker Hub Deployment

### Step 1: Create Docker Hub Access Token

1. Go to [Docker Hub](https://hub.docker.com/)
2. Login with your account: **gauravsharmax**
3. Click your profile → **Account Settings**
4. Go to **Security** → **Access Tokens**
5. Click **New Access Token**
   - Description: `GitHub Actions - my-portfolio`
   - Permissions: `Read, Write, Delete`
6. **Copy the token** (you won't see it again!)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repo: `https://github.com/gaurav-northeastern/my-portfolio`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these two secrets:

| Secret Name | Value |
|------------|-------|
| `DOCKERHUB_USERNAME` | `gauravsharmax` |
| `DOCKERHUB_TOKEN` | `<paste your Docker Hub token>` |

### Step 3: Enable GitHub Actions

1. Go to your repo → **Actions** tab
2. If actions are disabled, click **Enable Actions**

### Step 4: Push to Main Branch

```bash
git add .
git commit -m "Add Docker Hub CI/CD pipeline"
git push origin main
```

### Step 5: Verify the Deployment

1. Go to **Actions** tab in your GitHub repo
2. You should see a workflow running called "Build and Push to Docker Hub"
3. Wait for it to complete (usually 3-5 minutes)
4. Check Docker Hub: `https://hub.docker.com/r/gauravsharmax/my-portfolio`

---

## 📋 What the Workflow Does

The **docker-deploy.yml** workflow automatically:

1. ✅ **Triggers** on every push to `main` branch
2. ✅ **Builds** your Docker image (multi-platform: amd64 & arm64)
3. ✅ **Tags** the image with:
   - `latest` (always points to the newest build)
   - `main-<commit-sha>` (specific version)
4. ✅ **Pushes** to Docker Hub: `gauravsharmax/my-portfolio`
5. ✅ **Tests** the image with a health check
6. ✅ **Caches** layers for faster future builds

---

## 🏷️ Image Tags Explained

After each push to main, you'll get multiple tags:

```
gauravsharmax/my-portfolio:latest                  # Always the newest
gauravsharmax/my-portfolio:main-a1b2c3d           # Specific commit (short SHA)
gauravsharmax/my-portfolio:main-a1b2c3d4e5f6...   # Specific commit (full SHA)
gauravsharmax/my-portfolio:main                   # Branch name
```

**To use the image:**

```bash
# Pull latest version
docker pull gauravsharmax/my-portfolio:latest

# Pull specific version
docker pull gauravsharmax/my-portfolio:main-a1b2c3d

# Run the container
docker run -d -p 8080:80 --name portfolio gauravsharmax/my-portfolio:latest
```

---

## 🔍 Workflow Breakdown

### File Location
`.github/workflows/docker-deploy.yml`

### Key Steps

#### 1. **Checkout Code**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```
Downloads your repository code.

#### 2. **Set up QEMU**
```yaml
- name: Set up QEMU
  uses: docker/setup-qemu-action@v3
```
Enables building for multiple CPU architectures (amd64, arm64).

#### 3. **Set up Docker Buildx**
```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3
```
Advanced Docker builder with caching and multi-platform support.

#### 4. **Login to Docker Hub**
```yaml
- name: Login to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```
Authenticates with Docker Hub using your secrets.

#### 5. **Extract Metadata**
```yaml
- name: Extract Docker metadata
  id: meta
  uses: docker/metadata-action@v5
```
Automatically generates tags based on branch, commit SHA, etc.

#### 6. **Build and Push**
```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    platforms: linux/amd64,linux/arm64
    push: true
    cache-from: type=registry,ref=...
    cache-to: type=registry,ref=...
```
Builds the image, uses caching, and pushes to Docker Hub.

#### 7. **Health Check**
```yaml
- name: Test Docker image
  run: |
    docker pull gauravsharmax/my-portfolio:latest
    docker run -d -p 8080:80 test-container
    curl -f http://localhost:8080
```
Pulls the image and verifies it's working correctly.

---

## 🐛 Troubleshooting

### Workflow Fails at "Login to Docker Hub"

**Error:** `unauthorized: incorrect username or password`

**Solution:**
1. Check that `DOCKERHUB_USERNAME` is `gauravsharmax` (no typos)
2. Regenerate Docker Hub token
3. Update `DOCKERHUB_TOKEN` secret in GitHub

### Workflow Fails at "Build and push Docker image"

**Error:** `failed to solve: process "/bin/sh -c npm ci" didn't complete successfully`

**Solution:**
1. Check that `package-lock.json` exists
2. Ensure `.dockerignore` doesn't exclude `package-lock.json`
3. Test locally: `docker build -t test .`

### Workflow Succeeds but Image Not on Docker Hub

**Problem:** Image built successfully but not appearing on Docker Hub

**Solution:**
1. Make sure `push: true` is set (not `push: ${{ github.event_name != 'pull_request' }}`)
2. Check Docker Hub repository exists: `https://hub.docker.com/r/gauravsharmax/my-portfolio`
3. Create the repository manually on Docker Hub if needed

### Health Check Fails

**Error:** `curl: (7) Failed to connect to localhost port 8080`

**Solution:**
1. Increase sleep time from 10 to 30 seconds (large images take time to start)
2. Check Dockerfile `EXPOSE 80` is correct
3. Check nginx is running: `docker logs test-container`

---

## 🔄 Workflow Comparison

| Feature | docker-deploy.yml (NEW) | deploy.yml (OLD) |
|---------|------------------------|------------------|
| Deployment Target | Docker Hub | AWS ECR + S3 + CloudFront |
| Image Location | `gauravsharmax/my-portfolio` | AWS ECR |
| Hosting | Self-hosted (pull from Docker Hub) | AWS S3 static hosting |
| CDN | None (you add) | CloudFront |
| Cost | Docker Hub: Free for public images | AWS: Pay per usage |
| Setup Complexity | ⭐ Simple (2 secrets) | ⭐⭐⭐ Complex (5 secrets + AWS setup) |

---

## 🛠️ What's Wrong with Your Old AWS Workflow

The `deploy.yml` workflow has these issues:

1. **Missing AWS Setup** - Requires ECR repository, S3 bucket, CloudFront distribution
2. **Complex Dependencies** - Needs 5 different AWS secrets
3. **Cost** - AWS charges for S3, CloudFront, and data transfer
4. **Multi-step Process** - Builds Docker image, extracts files, uploads to S3

**If you want to keep using AWS:**
- Keep `deploy.yml`
- Add all 5 AWS secrets
- Create ECR repo: `aws ecr create-repository --repository-name portfolio-website`
- Create S3 bucket and CloudFront distribution

**If you want Docker Hub (simpler):**
- Use `docker-deploy.yml` ✅
- Delete or disable `deploy.yml`
- Only 2 secrets needed

---

## 📝 Next Steps

### Option 1: Use Docker Hub (Recommended for simplicity)

1. ✅ Add Docker Hub secrets (see Step 2 above)
2. ✅ Push to main branch
3. ✅ Wait for workflow to complete
4. ✅ Pull your image: `docker pull gauravsharmax/my-portfolio:latest`
5. ✅ Deploy anywhere that supports Docker

### Option 2: Keep AWS Deployment

1. Keep both workflows
2. `docker-deploy.yml` → Builds and pushes to Docker Hub
3. `deploy.yml` → Deploys to AWS
4. Both run on every push to main

### Option 3: Disable Old Workflow

Rename `deploy.yml` to `deploy.yml.disabled` to prevent it from running:

```bash
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
```

---

## 🎯 Testing Locally Before Pushing

Always test your Docker build locally first:

```bash
# Build the image
docker build -t gauravsharmax/my-portfolio:test .

# Run it
docker run -d -p 8080:80 --name test gauravsharmax/my-portfolio:test

# Test in browser
open http://localhost:8080

# Check logs
docker logs test

# Cleanup
docker stop test && docker rm test
```

---

## 📊 Monitoring Your Deployments

### GitHub Actions

1. Go to: `https://github.com/gaurav-northeastern/my-portfolio/actions`
2. See all workflow runs
3. Click on any run to see detailed logs

### Docker Hub

1. Go to: `https://hub.docker.com/r/gauravsharmax/my-portfolio`
2. See all image tags
3. View pull statistics
4. Check image size

---

## 🔒 Security Best Practices

1. ✅ **Never commit secrets** - Always use GitHub Secrets
2. ✅ **Use Access Tokens** - Not your Docker Hub password
3. ✅ **Limit token permissions** - Only Read/Write, not Admin
4. ✅ **Rotate tokens regularly** - Every 6-12 months
5. ✅ **Review workflow logs** - Don't expose sensitive data

---

## 💡 Pro Tips

### Speed Up Builds with Caching

The workflow already uses layer caching:

```yaml
cache-from: type=registry,ref=gauravsharmax/my-portfolio:buildcache
cache-to: type=registry,ref=gauravsharmax/my-portfolio:buildcache,mode=max
```

This means:
- First build: ~5 minutes
- Subsequent builds: ~2-3 minutes (with cache)

### Build Only on Version Tags

To avoid building on every commit:

```yaml
on:
  push:
    tags:
      - 'v*'  # Only build on version tags like v1.0.0
```

### Add Build Notifications

Get Slack/Discord notifications:

```yaml
- name: Notify on success
  if: success()
  run: |
    curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
      -d '{"text":"✅ Docker image built successfully!"}'
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Build Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-platform Builds](https://docs.docker.com/build/building/multi-platform/)

---

## ❓ FAQ

**Q: Can I use both workflows?**
A: Yes! `docker-deploy.yml` pushes to Docker Hub, `deploy.yml` deploys to AWS. They can run in parallel.

**Q: How do I delete old images from Docker Hub?**
A: Go to Docker Hub → Repository → Tags → Select tags → Delete

**Q: Can I make the repository private?**
A: Yes, but Docker Hub limits free private repos to 1. You'll need a paid plan for more.

**Q: How do I deploy the Docker image to a server?**
A: SSH into your server and run:
```bash
docker pull gauravsharmax/my-portfolio:latest
docker run -d -p 80:80 gauravsharmax/my-portfolio:latest
```

**Q: Can I customize the build process?**
A: Yes! Edit the Dockerfile or add build arguments in the workflow.

---

## ✅ Checklist

Before pushing to production:

- [ ] Docker Hub account created
- [ ] Docker Hub access token generated
- [ ] GitHub secrets added (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
- [ ] Dockerfile tested locally
- [ ] `.dockerignore` configured correctly
- [ ] Workflow file committed
- [ ] First push to main successful
- [ ] Image visible on Docker Hub
- [ ] Image tested by pulling and running

---

## 🆘 Need Help?

If you encounter issues:

1. Check the **Actions** tab for detailed error logs
2. Test Docker build locally: `docker build -t test .`
3. Verify GitHub secrets are set correctly
4. Check Docker Hub token hasn't expired
5. Review this guide's Troubleshooting section

Good luck with your deployment! 🚀
