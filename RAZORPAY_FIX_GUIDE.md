# Razorpay Authentication Error - Fix Guide

## Problem
Error: `Razorpay BadRequest Error: Authentication failed`

## Root Cause
The Razorpay API credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are not configured in the Render deployment environment variables.

## Verification
✅ Local test confirms credentials are valid and working
❌ Deployed backend on Render is missing these environment variables

## Solution

### Step 1: Configure Render Environment Variables

1. **Login to Render Dashboard**
   - Go to: https://dashboard.render.com/
   - Login with your account

2. **Select Your Backend Service**
   - Find and click on your service: `foodeo-wuda`
   - This is your FastAPI backend service

3. **Add Environment Variables**
   - Click on **"Environment"** in the left sidebar
   - Click **"Add Environment Variable"** button
   - Add the following variables:

   ```
   Key: RAZORPAY_KEY_ID
   Value: rzp_test_Rn2y1nsEX5U59v
   ```

   ```
   Key: RAZORPAY_KEY_SECRET
   Value: 7tfrzU63nQPRPavKu1IFtxyn
   ```

4. **Save Changes**
   - Click **"Save Changes"** button
   - Render will automatically trigger a new deployment

5. **Wait for Deployment**
   - Wait for the deployment to complete (usually 2-5 minutes)
   - Check the deployment logs for any errors

### Step 2: Verify the Fix

After deployment completes, test the payment flow:

1. Go to your frontend: https://foodeo-liard.vercel.app
2. Add items to cart
3. Proceed to checkout
4. Fill in delivery details
5. Select "Pay Online" payment method
6. Click "Pay" button

The Razorpay payment modal should now open successfully.

## Additional Notes

### Current Environment Variables on Render
Make sure you have ALL these variables configured:

```
CORS_ORIGINS=https://foodeo-liard.vercel.app
RAZORPAY_KEY_ID=rzp_test_Rn2y1nsEX5U59v
RAZORPAY_KEY_SECRET=7tfrzU63nQPRPavKu1IFtxyn
SUPABASE_URL=https://msytkjavapigijxqreji.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeXRramF2YXBpZ2lqeHFyZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTcyODUsImV4cCI6MjA3OTc5MzI4NX0.a0RkoCttEO5TFVuND6VhkdYzHeP835sGcY-dALXKpbM
```

### Testing Razorpay Locally
To test Razorpay connection locally, run:
```bash
cd backend
py test_razorpay.py
```

### Razorpay Dashboard
- Dashboard: https://dashboard.razorpay.com/
- Test Mode: Make sure you're in TEST mode
- API Keys: Settings → API Keys

### Important Security Notes
1. **Never commit .env files** to Git
2. **Use Test keys** for development
3. **Use Live keys** only in production (after KYC verification)
4. **Rotate keys** if they are exposed publicly

## Troubleshooting

### If error persists after adding environment variables:

1. **Check Render Logs**
   ```
   Go to Render Dashboard → Your Service → Logs
   Look for: "Razorpay Key ID present: True, Key Secret present: True"
   ```

2. **Verify Environment Variables**
   - In Render Dashboard, go to Environment tab
   - Ensure variables are saved and visible
   - Check for typos in variable names

3. **Force Redeploy**
   - In Render Dashboard, click "Manual Deploy" → "Deploy latest commit"

4. **Check Razorpay Account**
   - Login to Razorpay Dashboard
   - Verify Test Mode is enabled
   - Regenerate API keys if needed

### Common Mistakes
- ❌ Forgetting to save environment variables
- ❌ Using wrong variable names (must be exact)
- ❌ Adding extra spaces in values
- ❌ Not waiting for deployment to complete
- ❌ Using production keys in test mode

## Expected Behavior After Fix

1. **Backend logs should show**:
   ```
   Razorpay Key ID present: True, Key Secret present: True
   Order <order_id> created in Supabase successfully
   ```

2. **Frontend should**:
   - Open Razorpay payment modal
   - Show payment options (UPI, Cards, etc.)
   - Process payment successfully

3. **No more errors**:
   - No "Authentication failed" error
   - No 400 Bad Request error
   - Payment flow completes successfully

## Next Steps After Fix

1. Test the complete payment flow
2. Verify orders are created in Supabase
3. Check payment verification works
4. Test both Razorpay and COD payment methods

---

**Last Updated**: 2025-12-03
**Status**: Credentials verified locally ✅
**Action Required**: Add environment variables to Render
