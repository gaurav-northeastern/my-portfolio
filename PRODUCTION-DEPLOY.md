# Production Deployment Guide

This guide will help you deploy your portfolio to production with automatic deployments on every commit.

---

## 🎯 Recommended: Railway.app

**Why Railway?**
- ✅ Free $5 credit per month (enough for a portfolio)
- ✅ Auto-deploys from GitHub on every push
- ✅ Zero configuration - just works
- ✅ Custom domain support
- ✅ Built-in SSL/HTTPS
- ✅ Docker support out of the box

---

## 🚀 Setup Steps (5 minutes)

### Step 1: Sign Up for Railway

1. Go to [railway.app](https://railway.app/)
2. Click **"Start a New Project"**
3. Sign up with your **GitHub account** (gauravsharmax)
4. Authorize Railway to access your repositories

### Step 2: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Select your repository: `gaurav-northeastern/my-portfolio`
3. Railway will automatically detect your Dockerfile ✅
4. Click **"Deploy Now"**

### Step 3: Configure Settings

1. Go to **Settings** tab
2. **Port**: Set to `80` (matches your Dockerfile)
3. **Custom Domain** (optional):
   - Click **"Generate Domain"** for a free `.railway.app` URL
   - Or add your own domain (e.g., `gauravsharma.com`)

### Step 4: Done! 🎉

- Your site is now live!
- Every push to `main` branch = automatic deployment
- Railway URL: `https://your-app.railway.app`

---

## ⚙️ Railway Configuration Files

Railway works automatically with your Dockerfile, but you can add these files for more control:

### `railway.toml` (Optional - for advanced config)

Create this file in your project root:

```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Environment Variables (if needed)

In Railway dashboard:
1. Go to **Variables** tab
2. Add any environment variables
3. Example:
   - `NODE_ENV=production`
   - `PORT=80`

---

## 🔄 How Auto-Deploy Works

```
┌─────────────────────────────────────────────────────┐
│  Your Workflow                                      │
└─────────────────────────────────────────────────────┘

1. You make changes locally
   │
   ├─→ git add .
   ├─→ git commit -m "Update portfolio"
   ├─→ git push origin main
   │
2. GitHub receives push
   │
   ├─→ GitHub Actions runs (docker-deploy.yml)
   │   ├─→ Builds Docker image
   │   └─→ Pushes to Docker Hub
   │
3. Railway detects GitHub push
   │
   ├─→ Pulls latest code
   ├─→ Builds Docker image
   ├─→ Deploys to production
   └─→ Your site is live! 🚀

⏱️ Total time: 3-5 minutes from push to live
```

---

## 📊 Monitoring Your Deployments

### Railway Dashboard

1. **Deployments** tab: See all deployments
2. **Logs** tab: Real-time logs
3. **Metrics** tab: CPU, Memory, Network usage
4. **Settings** tab: Configuration

### Check Deployment Status

Railway provides a status page for each deployment:
- ✅ Building
- ✅ Deploying
- ✅ Active
- ❌ Failed (with error logs)

---

## 🌐 Custom Domain Setup

### Add Your Own Domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Railway dashboard, go to **Settings** → **Domains**
3. Click **"Custom Domain"**
4. Enter your domain: `gauravsharma.com`
5. Railway will give you DNS records to add:

```
Type: CNAME
Name: @
Value: your-app.railway.app
```

6. Add these records to your domain provider
7. Wait 5-60 minutes for DNS propagation
8. ✅ Your site is live on your custom domain with SSL!

---

## 💰 Pricing & Usage

### Railway Free Tier

- **$5 credit per month** (resets monthly)
- Usually covers:
  - Small apps with moderate traffic
  - ~2-3 small Docker containers
  - Estimated: 1000-5000 visitors/month

### Cost Breakdown

Railway charges by usage:
- **CPU**: $0.000463/vCPU/minute
- **Memory**: $0.000231/GB/minute
- **Network**: First 100GB free, then $0.10/GB

**For a portfolio site:**
- Expected cost: **$2-4/month** (well within free tier)

### Monitor Usage

Go to **Settings** → **Usage** to see your current spend.

---

## 🆚 Alternative: Render.com (Also Great)

If you prefer Render over Railway:

### Setup on Render

1. Go to [render.com](https://render.com/)
2. Sign in with GitHub
3. Click **"New" → "Web Service"**
4. Select `gaurav-northeastern/my-portfolio`
5. Configure:
   - **Name**: portfolio
   - **Environment**: Docker
   - **Plan**: Free
6. Click **"Create Web Service"**

### Render Free Tier

- ✅ Completely free (no credit card required)
- ⚠️ Limitation: Site spins down after 15 min of inactivity
- ⚠️ First request after spin-down takes ~30 seconds

**Good for**: Personal portfolios with moderate traffic
**Not good for**: High-traffic sites needing instant response

---

## 🏢 Alternative: DigitalOcean App Platform

More reliable than free tiers, but costs money.

### Setup on DigitalOcean

1. Go to [digitalocean.com/products/app-platform](https://www.digitalocean.com/products/app-platform)
2. Sign up and add payment method
3. Click **"Create App"**
4. Connect GitHub and select `gaurav-northeastern/my-portfolio`
5. Configure:
   - **Type**: Web Service
   - **Dockerfile**: Detected automatically
   - **Plan**: Basic ($5/month)
6. Click **"Create Resources"**

### Pricing

- **Basic**: $5/month
- **Pro**: $12/month (better performance)
- 3 free static sites (if you build to static files)

---

## 🔧 Alternative: AWS ECS Fargate (Advanced)

For enterprise-level deployment with full control.

### What You Need

1. **AWS Account** (credit card required)
2. **ECR Repository** (to store Docker images)
3. **ECS Cluster** (to run containers)
4. **Fargate Service** (serverless container hosting)
5. **Load Balancer** (optional, for custom domain)
6. **Route 53** (for DNS)

### Estimated Cost

- **ECS Fargate**: ~$15-20/month (0.25 vCPU, 0.5GB RAM)
- **Load Balancer**: ~$16/month (if used)
- **Total**: ~$15-35/month

### Setup Complexity

⚠️ **High** - Requires AWS knowledge
⏱️ **1-2 hours setup time**

**Only choose this if:**
- You need enterprise features
- You're already using AWS
- Cost is not a concern
- You want maximum control

I can help set this up if needed, but Railway/Render is much simpler.

---

## 📝 Workflow Comparison

| Feature | Railway | Render | DigitalOcean | AWS Fargate |
|---------|---------|--------|--------------|-------------|
| **Cost** | $5 credit/mo | Free (limited) | $5/mo | $15-35/mo |
| **Setup Time** | 5 min | 5 min | 10 min | 1-2 hrs |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes | ⚙️ Manual |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **SSL** | ✅ Auto | ✅ Auto | ✅ Auto | ⚙️ Manual |
| **Spin Down** | ❌ No | ⚠️ Yes (free) | ❌ No | ❌ No |
| **Complexity** | ⭐ Easy | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Hard |
| **Recommended For** | Portfolios | Personal sites | Production apps | Enterprise |

---

## 🎯 My Recommendation

**Start with Railway:**

1. ✅ Free tier is generous ($5/month credit)
2. ✅ Zero config - uses your Dockerfile
3. ✅ Auto-deploys on every push
4. ✅ No spin-down delays
5. ✅ Easy custom domain setup
6. ✅ Great for portfolios

**Upgrade later to:**
- **DigitalOcean** if you need guaranteed uptime
- **AWS** if you need enterprise features

---

## 🔄 Complete CI/CD Flow (Railway + Docker Hub)

```
┌─────────────────────────────────────────────────────┐
│  Your Complete CI/CD Pipeline                       │
└─────────────────────────────────────────────────────┘

1. Local Development
   ├─→ Make changes
   ├─→ Test locally: npm run dev
   ├─→ Test Docker: docker-compose up
   └─→ Commit: git commit -m "..."

2. Push to GitHub
   └─→ git push origin main

3. GitHub Actions (Parallel)
   ├─→ Builds Docker image
   ├─→ Pushes to Docker Hub (gauravsharmax/my-portfolio)
   └─→ Runs tests

4. Railway (Triggered by GitHub Push)
   ├─→ Detects new commit
   ├─→ Pulls code
   ├─→ Builds Docker image
   ├─→ Deploys to production
   └─→ Health check ✅

5. Live!
   └─→ https://your-app.railway.app

⏱️ Total: 3-5 minutes from commit to production
```

---

## 🛠️ Setup Checklist

Before deploying to production:

### Docker Hub (Already Done ✅)
- [x] Dockerfile created
- [x] .dockerignore configured
- [x] GitHub Actions workflow (docker-deploy.yml)
- [ ] Add GitHub secrets:
  - `DOCKERHUB_USERNAME`: gauravsharmax
  - `DOCKERHUB_TOKEN`: (your Docker Hub token)

### Railway Setup
- [ ] Sign up at railway.app
- [ ] Connect GitHub account
- [ ] Deploy from `gaurav-northeastern/my-portfolio`
- [ ] Verify deployment successful
- [ ] (Optional) Add custom domain

### Testing
- [ ] Push a small change to test auto-deploy
- [ ] Verify site loads correctly
- [ ] Check all images and assets load
- [ ] Test on mobile
- [ ] Test resume download

---

## 🐛 Troubleshooting

### Railway Deployment Fails

**Error**: `Failed to build Docker image`

**Solution**:
1. Check Railway logs for specific error
2. Test build locally: `docker build -t test .`
3. Ensure Dockerfile is in root directory
4. Check that build output is `build/` not `dist/`

### Site Shows "Application Error"

**Solution**:
1. Check Railway logs
2. Verify PORT is set to 80
3. Ensure nginx is running
4. Test locally: `docker run -p 8080:80 yourimage`

### Docker Hub Not Updating

**Solution**:
1. Check GitHub Actions workflow ran successfully
2. Verify DOCKERHUB_TOKEN is valid
3. Check Docker Hub repository exists

### Auto-Deploy Not Working

**Solution**:
1. Ensure Railway is connected to correct GitHub repo
2. Check Railway is watching the `main` branch
3. Verify you're pushing to `main` (not another branch)

---

## 📚 Next Steps

1. **Choose your platform**: Railway (recommended)
2. **Add Docker Hub secrets** to GitHub (see CI-CD-SETUP.md)
3. **Deploy to Railway** (5 minute setup)
4. **Test auto-deploy**: Make a small change and push
5. **Add custom domain** (optional)
6. **Monitor usage** and costs

---

## 🆘 Need Help?

If you run into issues:

1. Check Railway/Render logs first
2. Test Docker build locally
3. Verify GitHub Actions succeeded
4. Check this guide's Troubleshooting section
5. Railway docs: [docs.railway.app](https://docs.railway.app/)

---

## 💡 Pro Tips

### Speed Up Builds
- Railway caches Docker layers automatically
- First deploy: ~3-5 minutes
- Subsequent deploys: ~1-2 minutes

### Zero Downtime Deploys
- Railway does rolling deployments by default
- Old version stays up until new version is healthy
- No downtime during deployments ✅

### Preview Deployments
- Railway can create preview URLs for PR branches
- Test changes before merging to main

### Monitoring
- Use Railway's built-in metrics
- Add external monitoring (UptimeRobot, etc.)
- Set up alerts for downtime

---

## ✅ Final Checklist

Before going live:

- [ ] Domain configured (or using Railway/Render URL)
- [ ] SSL certificate active (automatic)
- [ ] All images and assets loading
- [ ] Resume download working
- [ ] Mobile responsive design verified
- [ ] Contact form working (if you have one)
- [ ] Analytics added (Google Analytics, Plausible, etc.)
- [ ] Social links correct
- [ ] SEO meta tags added
- [ ] Favicon added

---

## 🎉 You're Ready!

Your complete CI/CD pipeline:

```
Local → GitHub → GitHub Actions → Docker Hub
                           ↓
                       Railway
                           ↓
                     PRODUCTION! 🚀
```

Every commit to `main` = Live in production in 3-5 minutes!

Good luck with your deployment! 🚀
