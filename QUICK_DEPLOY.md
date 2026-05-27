# Quick Deploy to Vercel

Your code is now on GitHub and ready to deploy. Follow these simple steps:

## 1️⃣ Go to Vercel Dashboard
👉 **https://vercel.com/dashboard**

## 2️⃣ Import Project
- Click **"Add New"** → **"Project"**
- Select your **GitHub** account
- Find **"EDGEAI"** repository
- Click **"Import"**

## 3️⃣ Configure Build Settings (Auto-Detected ✅)
Vercel will auto-detect:
- **Framework:** Node.js (pnpm monorepo)
- **Build Command:** Configured in `vercel.json`
- **Root Directory:** `.` (default)

Click **"Next"** to continue.

## 4️⃣ Add Environment Variables ⚠️ IMPORTANT
Click **"Environment Variables"** and add these variables:

| Name | Value | Set For |
|------|-------|---------|
| `BETTER_AUTH_API_KEY` | `ba_qgyux3ahirvh6j935lozz7pjf4mgrrd4` | Production |
| `BETTER_AUTH_SECRET` | Generate with: `openssl rand -base64 32` | Production |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | Production |
| `ANTHROPIC_API_KEY` | `sk-ant-xxxxx` | Production |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_cXVpY2stZ2FyZmlzaC0yOC5jbGVyay5hY2NvdW50cy5kZXYk` | Production |

**⚠️ Make sure all are set to "Production" environment!**

## 5️⃣ Deploy
- Click **"Deploy"** button
- Wait 2-3 minutes for build and deployment
- Once complete, you'll see:
  ```
  ✅ Production Deployment Complete
  https://edgeai-xxxxx.vercel.app
  ```

## 6️⃣ Your Vercel URL
Copy your deployment URL from the success page. It will look like:
```
https://edgeai-abc123def456.vercel.app
```

## 7️⃣ Verify Connection
Once deployed, test the endpoint:
```bash
curl https://edgeai-xxxxx.vercel.app/api/auth

# Should return:
# {"ok":true,"configured":true}
```

## 8️⃣ Complete Better Auth Onboarding
1. Go to **https://dash.better-auth.com/onboarding**
2. Paste your Vercel URL
3. Click **"Verify Connection"**
4. Dashboard should show ✅ **Connected**

---

## 🆘 Troubleshooting

**Build fails?**
- Check Vercel build logs for specific error
- Ensure all env vars are added before deploying

**`/api/auth` returns 503?**
- Redeploy after adding `BETTER_AUTH_API_KEY`
- Settings → Deployments → Click latest → "Redeploy"

**Better Auth still shows "Could not verify"?**
- Wait 5 minutes for DNS propagation
- Manually test: `curl https://<your-url>/api/auth`
- Try the verification again

---

## Next Steps After Deployment ✅

Once Better Auth confirms connection:
1. Frontend authentication setup (replace Clerk with Better Auth)
2. Database integration
3. OAuth provider setup
4. Full end-to-end testing

**Let me know your Vercel URL once deployed!** I'll help with the next steps. 🚀
