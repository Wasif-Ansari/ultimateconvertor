# Deploy Ultimate File Converter to Render

This guide will help you deploy the Ultimate File Converter to Render with full FFmpeg support for video and audio conversions.

## Why Render?

- ✅ **Built-in FFmpeg support** - No manual installation needed
- ✅ **Free tier available** - 750 hours/month free
- ✅ **Persistent disk storage** - For file uploads/conversions
- ✅ **Automatic SSL** - Free HTTPS certificates
- ✅ **Git integration** - Auto-deploy on push
- ✅ **Environment variables** - Easy configuration
- ✅ **No timeout limits** - Long-running conversions work fine

## Prerequisites

1. A GitHub account
2. A Render account (sign up at https://render.com)
3. Your code pushed to GitHub

---

## Step 1: Push Your Code to GitHub

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ultimate File Converter"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ultimate-file-converter.git
git branch -M main
git push -u origin main
```

---

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended for easy integration)

---

## Step 3: Deploy to Render

### Option A: Blueprint Deployment (Automatic - Recommended)

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and configure everything automatically
5. Click "Apply" to deploy

### Option B: Manual Deployment

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ultimate-file-converter`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_VERSION` = `20.11.0`
   - `UPLOADS_DIR` = `/tmp/uploads`

6. Add Persistent Disk (Important for file storage):
   - Click "Advanced" → "Add Disk"
   - **Name**: `uploads`
   - **Mount Path**: `/tmp/uploads`
   - **Size**: 1 GB (free tier)

7. Click "Create Web Service"

---

## Step 4: Install FFmpeg (Automatic on Render)

Render automatically includes FFmpeg in the build environment! No manual installation needed.

To verify FFmpeg is available, you can add a build hook in `render.yaml`:

```yaml
services:
  - type: web
    buildCommand: |
      ffmpeg -version
      npm install
      npm run build
```

---

## Step 5: Configure Environment Variables

In your Render dashboard:

1. Go to your service → "Environment"
2. Add these variables:

```
NODE_VERSION=20.11.0
UPLOADS_DIR=/tmp/uploads
NEXT_PUBLIC_BASE_URL=https://your-app-name.onrender.com
```

The `NEXT_PUBLIC_BASE_URL` will be auto-generated after first deployment.

---

## Step 6: Deploy!

Render will automatically:
1. ✅ Clone your repository
2. ✅ Install FFmpeg (built-in)
3. ✅ Run `npm install`
4. ✅ Run `npm run build`
5. ✅ Start your app with `npm start`
6. ✅ Provide HTTPS URL

**First deployment takes 5-10 minutes.**

---

## Step 7: Access Your App

Once deployed, you'll get a URL like:
```
https://ultimate-file-converter.onrender.com
```

Your app is now live with full FFmpeg support! 🎉

---

## Adding Video/Audio Converters

Now that you have FFmpeg, you can add video/audio conversion tools:

### 1. Install fluent-ffmpeg

```powershell
npm install fluent-ffmpeg @types/fluent-ffmpeg
```

### 2. Create Video Converter

Create `lib/converters/video.ts`:

```typescript
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import type { ConversionJobData } from '@/lib/jobs';

export async function convertMp4ToWebm(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  return new Promise((resolve, reject) => {
    ffmpeg(job.sourcePath)
      .output(targetPath)
      .videoCodec('libvpx-vp9')
      .audioCodec('libopus')
      .on('end', () => resolve({ outputPath: targetPath }))
      .on('error', reject)
      .run();
  });
}
```

### 3. Add to Converter Registry

Update `lib/converters/index.ts`:

```typescript
import { convertMp4ToWebm } from './video';

export const converters = {
  // ... existing converters
  mp4ToWebm: convertMp4ToWebm,
};
```

### 4. Add Tool Definition

Update `lib/tools.ts`:

```typescript
{
  slug: "mp4-to-webm",
  label: "MP4 → WebM",
  description: "Convert MP4 videos to WebM format for web optimization.",
  sourceExtensions: [".mp4"],
  targetExtension: ".webm",
  category: "videos",
  converter: "mp4ToWebm"
}
```

---

## Monitoring & Logs

1. **View Logs**: Dashboard → Your Service → Logs
2. **Check Health**: Dashboard → Your Service → Events
3. **Monitor Usage**: Dashboard → Your Service → Metrics

---

## Render Free Tier Limits

- ✅ **750 hours/month** of runtime
- ✅ **512 MB RAM** (upgrade to $7/mo for 2GB)
- ✅ **1 GB disk storage** (upgrade for more)
- ⚠️ **Sleeps after 15 min inactivity** (wakes on request)
- ⚠️ **Slower cold starts** (~30 seconds)

**Upgrade to Starter ($7/mo) for:**
- No sleep
- Faster performance
- 2 GB RAM
- Better for video processing

---

## Updating Your App

Render auto-deploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Add video converters"
git push

# Render automatically detects the push and redeploys!
```

---

## Troubleshooting

### Issue: "FFmpeg not found"
**Solution**: FFmpeg is pre-installed on Render. Check build logs to verify.

### Issue: "Disk full"
**Solution**: Increase disk size in Render dashboard or clean up old files.

### Issue: "Out of memory"
**Solution**: Upgrade to Starter plan ($7/mo) for more RAM.

### Issue: "Timeout on large video"
**Solution**: Add progress tracking and handle long conversions async.

---

## Cost Comparison

| Platform | FFmpeg | Free Tier | Paid Plan |
|----------|--------|-----------|-----------|
| **Render** | ✅ Built-in | 750 hrs/mo | $7/mo starter |
| **Railway** | ✅ Built-in | $5 credit | $5/mo usage |
| **Heroku** | ✅ Buildpack | No free tier | $7/mo |
| **Vercel** | ❌ No FFmpeg | Unlimited | Can't add FFmpeg |

**Render is the best choice for your use case!**

---

## Next Steps

1. ✅ Deploy app to Render
2. ✅ Test current 49 converters
3. ✅ Add video/audio converters using FFmpeg
4. ✅ Test video conversions
5. ✅ Monitor performance
6. ✅ Upgrade to paid plan if needed

---

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- FFmpeg Docs: https://ffmpeg.org/documentation.html

---

Made with ❤️ - Your Ultimate File Converter on Render!
