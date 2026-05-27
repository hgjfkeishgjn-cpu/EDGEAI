# Deployment Guide — Better Auth Integration

This guide walks you through deploying the EDGEAI app to **Vercel** with Better Auth authentication.

## Prerequisites

- Vercel account (https://vercel.com)
- Better Auth API key: `ba_qgyux3ahirvh6j935lozz7pjf4mgrrd4`
- GitHub repository connected to Vercel

---

## Step 1: Add Environment Variables to Vercel Dashboard

1. Go to **https://vercel.com/dashboard**
2. Select your **EDGEAI** project
3. Go to **Settings → Environment Variables**
4. Add the following variables:

| Variable Name | Value | Note |
|---|---|---|
| `BETTER_AUTH_API_KEY` | `ba_qgyux3ahirvh6j935lozz7pjf4mgrrd4` | **Required for Better Auth verification** |
| `BETTER_AUTH_SECRET` | (generate a random string) | Generate with: `openssl rand -base64 32` |
| `DATABASE_URL` | (your PostgreSQL URL) | e.g., `postgresql://user:pass@host:5432/db` |
| `ANTHROPIC_API_KEY` | (your API key) | Get from https://console.anthropic.com |

> **Note:** All variables should be added to **Production** environment.

---

## Step 2: Verify `/api/auth` Endpoint

Once deployed, verify the endpoint is responding:

```bash
curl https://<your-vercel-domain>/api/auth
```

Expected response:
```json
{
  "ok": true,
  "configured": true,
  "message": "Better Auth is configured and ready"
}
```

---

## Step 3: Complete Better Auth Onboarding

1. Go to **https://dash.better-auth.com/onboarding**
2. Paste your deployment URL: `https://<your-vercel-domain>`
3. Click **Verify Connection**
4. Dashboard will test the `/api/auth` endpoint and confirm configuration

---

## Step 4: Deploy

Once environment variables are set in Vercel dashboard:

### Option A: Auto-deploy from GitHub
- Push changes to `main` branch
- Vercel will auto-build and deploy

### Option B: Manual deploy
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login and deploy
vercel --prod
```

---

## Troubleshooting

### `/api/auth` returns 503
**Issue:** `BETTER_AUTH_API_KEY` not set in Vercel environment

**Fix:** 
1. Go to Vercel → Settings → Environment Variables
2. Confirm `BETTER_AUTH_API_KEY` is added to **Production**
3. Redeploy: `vercel --prod`

### Frontend loads but `/api/*` returns 404
**Issue:** API server not building correctly

**Fix:**
1. Check Vercel build logs: **Deployments → [latest] → Build Logs**
2. Ensure `artifacts/api-server/package.json` dependencies are installed
3. Redeploy with verbose logs: `vercel --prod --debug`

### Better Auth dashboard shows "Could not verify connection"
**Issue:** External connectivity from Vercel to Better Auth failing

**Fix:**
1. Verify endpoint manually: `curl https://<domain>/api/auth`
2. Check that `BETTER_AUTH_API_KEY` is set in environment
3. Ensure no firewall/CORS issues (Vercel has no outbound restrictions)
4. Try redeploy: `vercel --prod --force`

---

## Current Configuration

- **Frontend:** React + Vite, served from `/`
- **API Server:** Express.js on `/api/*`
- **Auth:** Better Auth with `dash()` plugin for onboarding verification
- **Database:** PostgreSQL (configure via `DATABASE_URL`)
- **AI:** Anthropic Claude (configure via `ANTHROPIC_API_KEY`)

---

## Next Steps

After successful deployment:

1. ✅ Verify `/api/auth` responds with `configured: true`
2. ✅ Complete Better Auth dashboard onboarding
3. ✅ Wire up Better Auth client in frontend (replace Clerk)
4. ✅ Set up database with proper schema
5. ✅ Test authentication flows end-to-end

