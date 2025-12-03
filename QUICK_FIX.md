# 🚨 QUICK FIX: Razorpay Authentication Error

## The Problem
```
Razorpay BadRequest Error: Authentication failed
```

## The Solution (3 Steps)

### ✅ Step 1: Login to Render
Go to: **https://dashboard.render.com/**

### ✅ Step 2: Add Environment Variables
1. Click on your service: **foodeo-wuda**
2. Go to **Environment** tab
3. Click **Add Environment Variable**
4. Add these TWO variables:

```
RAZORPAY_KEY_ID
rzp_test_Rn2y1nsEX5U59v
```

```
RAZORPAY_KEY_SECRET
7tfrzU63nQPRPavKu1IFtxyn
```

### ✅ Step 3: Save & Wait
1. Click **Save Changes**
2. Wait 2-5 minutes for deployment
3. Test payment on your website

---

## ✅ Verification
After deployment, the payment should work! Test it:
1. Go to: https://foodeo-liard.vercel.app
2. Add items to cart
3. Checkout → Pay Online
4. Razorpay modal should open ✅

---

## 📝 Notes
- ✅ Credentials are **valid** (tested locally)
- ❌ Missing from **Render deployment**
- 🔧 Fix: Add to Render environment variables

---

**Need detailed help?** See: `RAZORPAY_FIX_GUIDE.md`
