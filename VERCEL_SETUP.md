# Vercel Environment Variables Setup Guide

## Quick Setup via Vercel Dashboard (Easiest Method)

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your **foodeo** project

### Step 2: Add Environment Variables
1. Click **Settings** (in the top menu)
2. Click **Environment Variables** (in the left sidebar)
3. Add each of these variables:

#### Variable 1: API URL
- **Name:** `REACT_APP_API_URL`
- **Value:** `https://foodeo-wuda.onrender.com`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variable 2: Supabase URL
- **Name:** `REACT_APP_SUPABASE_URL`
- **Value:** `https://msytkjavapigijxqreji.supabase.co`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variable 3: Supabase Key
- **Name:** `REACT_APP_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeXRramF2YXBpZ2lqeHFyZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTcyODUsImV4cCI6MjA3OTc5MzI4NX0.a0RkoCttEO5TFVuND6VhkdYzHeP835sGcY-dALXKpbM`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variable 4: Razorpay Key
- **Name:** `REACT_APP_RAZORPAY_KEY_ID`
- **Value:** `rzp_test_Rn2y1nsEX5U59v`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variable 5: Google Maps API Key
- **Name:** `REACT_APP_GOOGLE_MAPS_API_KEY`
- **Value:** `AIzaSyDopJ5FAcJfD6SWlfhqaFtRSipB7OIZKOs`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **3 dots menu** (⋯)
4. Click **Redeploy**
5. Wait for deployment to complete (~2-3 minutes)

### Step 4: Test
1. Visit: https://foodeo-liard.vercel.app
2. Go to "My Orders"
3. Click "Cancel Order"
4. Modal should appear and work perfectly!

---

## Alternative: Deploy via Git Push

If you prefer to trigger a new deployment:

```bash
# Commit any pending changes
git add .
git commit -m "Added My Orders page with cancel functionality"
git push origin main
```

Vercel will automatically deploy when you push to GitHub.

---

## Verification Checklist

After deployment, verify:
- ✅ My Orders page loads
- ✅ Orders are fetched from Render backend
- ✅ Cancel Order button shows modal
- ✅ Modal accepts cancellation reason
- ✅ Order cancellation works
- ✅ No console errors

---

## Troubleshooting

### If you still see ERR_NAME_NOT_RESOLVED:
1. Check that `REACT_APP_API_URL` is set in Vercel
2. Make sure you redeployed after adding variables
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

### If modal doesn't appear:
1. Check browser console for CSS errors
2. Verify `MyOrdersModal.css` is deployed
3. Hard refresh the page

---

## Current Status

✅ **Local Development:** Working perfectly
⏳ **Production (Vercel):** Needs environment variables
✅ **Backend (Render):** Running and accessible

---

**Next Step:** Go to Vercel Dashboard and add the environment variables listed above!
