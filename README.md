# 🛒 Foodeo - Online Grocery Shopping Platform

A modern, full-stack online grocery shopping application with real-time order tracking, payment integration, and comprehensive testing capabilities.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🎯 Overview

Foodeo is a comprehensive online grocery shopping platform that provides:
- **Fast Delivery**: 10-minute delivery promise
- **Wide Product Range**: 2000+ products across multiple categories
- **Secure Payments**: Razorpay integration with COD option
- **Order Tracking**: Real-time order status and delivery tracking
- **User Authentication**: Google OAuth and phone authentication via Supabase
- **Location Services**: Smart location detection and manual selection
- **Testing Dashboard**: Comprehensive order testing interface

---

## ✨ Features

### Customer Features
- 🔍 **Smart Search** - Search across 2000+ products with live suggestions
- 📍 **Location Services** - Auto-detect or manually select delivery location
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 💳 **Multiple Payment Options** - Razorpay (UPI, Cards, Wallets) and Cash on Delivery
- 📦 **Order Tracking** - Real-time order status with timeline
- ❌ **Order Cancellation** - Cancel orders within time windows with automatic refunds
- 💰 **Refund Management** - Automatic refund processing for cancelled orders
- 🔐 **Secure Authentication** - Google OAuth and phone number login
- 📱 **Responsive Design** - Works seamlessly on all devices

### Admin/Testing Features
- 🧪 **Testing Dashboard** - Comprehensive order testing interface (Ctrl+Shift+T)
- 📊 **Order Management** - View and manage all orders
- 🔄 **Status Updates** - Update order status through various stages
- 💵 **Refund Tracking** - Monitor refund status and processing

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Hooks** - State management
- **CSS3** - Styling with modern features
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Supabase Client** - Authentication and database

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Supabase** - PostgreSQL database
- **Razorpay** - Payment gateway
- **Python-dotenv** - Environment management
- **HTTPX** - HTTP client
- **Pydantic** - Data validation

### Development Tools
- **pnpm** - Package manager (frontend)
- **pip** - Package manager (backend)
- **Git** - Version control

---

## 📁 Project Structure

```
FoodOrdering/
├── frontend/                      # React frontend application
│   ├── public/                    # Static assets
│   │   ├── oil/                   # Hair oil product images
│   │   └── ...
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── AppDownloadSection.jsx      # App download CTA
│   │   │   ├── CartSidebar.jsx             # Shopping cart sidebar
│   │   │   ├── CategoryGrid.jsx            # Product categories grid
│   │   │   ├── CheckoutPage.jsx            # Checkout and payment
│   │   │   ├── DeliveryBanner.jsx          # Delivery info banner
│   │   │   ├── FeaturesSection.jsx         # Features showcase
│   │   │   ├── Footer.jsx                  # Footer with links
│   │   │   ├── Header.jsx                  # Navigation header
│   │   │   ├── HeroBanner.jsx              # Hero section
│   │   │   ├── LazyLoadSection.jsx         # Lazy loading wrapper
│   │   │   ├── Loader.jsx                  # Loading spinner
│   │   │   ├── LocationSearch.jsx          # Location selector
│   │   │   ├── LoginModal.jsx              # Authentication modal
│   │   │   ├── OrderTestingPage.jsx        # Testing dashboard
│   │   │   ├── OrderTestingPage.css        # Testing dashboard styles
│   │   │   ├── PolicyPages.jsx             # Privacy, Terms, etc.
│   │   │   ├── ProductCard.jsx             # Product display card
│   │   │   ├── ProductCarousel.jsx         # Product carousel
│   │   │   ├── PromoBanner.jsx             # Promotional banner
│   │   │   ├── SearchResults.jsx           # Search results page
│   │   │   ├── WhatsAppButton.jsx          # WhatsApp contact
│   │   │   └── ui/                         # Reusable UI components
│   │   │       ├── button.jsx              # Button component
│   │   │       ├── dialog.jsx              # Dialog/Modal
│   │   │       ├── dropdown-menu.jsx       # Dropdown menu
│   │   │       ├── input.jsx               # Input field
│   │   │       ├── sonner.jsx              # Toast notifications
│   │   │       └── ... (40+ UI components)
│   │   ├── context/
│   │   │   └── AuthContext.jsx             # Authentication context
│   │   ├── data/                           # Product and location data
│   │   │   ├── dummyJsonProducts.js        # Sample products
│   │   │   ├── fruitVegData.js             # Fruits & vegetables
│   │   │   ├── generateFruitsData.js       # Fruit data generator
│   │   │   ├── kaggle_products.js          # Kaggle dataset products
│   │   │   ├── locations.js                # Indian locations
│   │   │   ├── mockData.js                 # Main product data
│   │   │   ├── openFoodFactsProducts.js    # Open Food Facts data
│   │   │   ├── productGenerator.js         # Product generator
│   │   │   ├── productImages.js            # Product image URLs
│   │   │   ├── products.js                 # Custom products
│   │   │   └── teaCoffeeData.js            # Tea & coffee products
│   │   ├── hooks/
│   │   │   └── use-toast.js                # Toast notification hook
│   │   ├── lib/
│   │   │   ├── supabase.js                 # Supabase client
│   │   │   └── utils.js                    # Utility functions
│   │   ├── App.css                         # App styles
│   │   ├── App.js                          # Main app component
│   │   ├── index.css                       # Global styles
│   │   └── index.js                        # Entry point
│   ├── package.json                        # Dependencies
│   └── ...
│
├── backend/                       # FastAPI backend
│   ├── server.py                  # Main FastAPI application
│   │   ├── FastAPI app setup
│   │   ├── CORS configuration
│   │   ├── Supabase integration
│   │   ├── Razorpay integration
│   │   ├── Order management endpoints
│   │   ├── Payment processing
│   │   ├── Order tracking
│   │   ├── Cancellation logic
│   │   └── Refund processing
│   ├── .env                       # Environment variables
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Docker configuration
│   ├── render.yaml                # Render deployment config
│   ├── start.sh                   # Startup script
│   ├── supabase_schema_update.sql # Database schema
│   ├── test_razorpay.py           # Razorpay testing
│   ├── load_kaggle_groceries.py   # Kaggle data loader
│   └── process_openfoodfacts.py   # Open Food Facts processor
│
├── tests/                         # Test files
│   └── ...
├── dataset/                       # Product datasets
│   └── ... (87 files)
├── test_order_system.py           # Order testing script
├── backend_test.py                # Backend API tests
└── README.md                      # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- pnpm (or npm)
- Supabase account
- Razorpay account (for payments)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Create .env file
# Add your Supabase credentials
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:8000

# Start development server
pnpm start
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CORS_ORIGINS=http://localhost:3000

# Run database migrations
# Execute supabase_schema_update.sql in Supabase SQL Editor

# Start server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

---

## 💻 Usage

### Running the Application

1. **Start Backend**:
   ```bash
   cd backend
   uvicorn server:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   pnpm start
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Testing Dashboard

Access the comprehensive testing dashboard:
- **Keyboard Shortcut**: `Ctrl + Shift + T`
- **Return to Home**: `Ctrl + Shift + H`

Features:
- Create test orders (COD & Razorpay)
- Update order status
- Test cancellation flows
- Check refund status
- View order tracking data
- Run automated test suite

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Orders

**Create Order**
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "product_id": 1,
      "name": "Product Name",
      "price": 500,
      "quantity": 2,
      "image": "image_url",
      "weight": "500g"
    }
  ],
  "total_amount": 1000,
  "customer": {
    "name": "Customer Name",
    "phone": "+919876543210",
    "email": "customer@example.com",
    "address": "123 Street",
    "city": "City",
    "pincode": "123456"
  },
  "payment_method": "cod" | "razorpay"
}
```

**Get Order**
```http
GET /api/orders/{order_id}
```

**Get All Orders**
```http
GET /api/orders
```

**Get Order Tracking**
```http
GET /api/orders/{order_id}/tracking
```

**Update Order Status**
```http
PATCH /api/orders/{order_id}/status
Content-Type: application/json

{
  "status": "confirmed" | "preparing" | "out_for_delivery" | "delivered",
  "delivery_partner_name": "Partner Name",
  "delivery_partner_phone": "+919876543210",
  "estimated_delivery_time": "2025-12-04T12:00:00Z"
}
```

**Cancel Order**
```http
POST /api/orders/{order_id}/cancel
Content-Type: application/json

{
  "order_id": "order_id",
  "cancellation_reason": "Reason",
  "cancelled_by": "customer" | "restaurant" | "admin"
}
```

**Get Refund Status**
```http
GET /api/orders/{order_id}/refund-status
```

**Update Delivery Location**
```http
POST /api/orders/{order_id}/delivery-location
Content-Type: application/json

{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "delivery_partner_name": "Partner Name"
}
```

#### Payments

**Create Razorpay Order**
```http
POST /api/razorpay/create-order
Content-Type: application/json

{
  "amount": 100000,  // Amount in paise
  "currency": "INR"
}
```

**Verify Payment**
```http
POST /api/razorpay/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature",
  "order_id": "order_id"
}
```

---

## 🧪 Testing

### Order Testing Dashboard

1. **Access**: Press `Ctrl + Shift + T`
2. **Features**:
   - Automated test suite
   - Manual order creation
   - Status updates
   - Cancellation testing
   - Refund verification

### Python Test Script

```bash
python test_order_system.py
```

Runs comprehensive tests for:
- Order creation
- Order tracking
- Status updates
- Cancellation rules
- Refund processing
- Time window validation

### Backend API Tests

```bash
python backend_test.py
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service in Render
3. Configure environment variables
4. Use `render.yaml` for configuration
5. Deploy

### Environment Variables

**Frontend (.env)**:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=your_backend_url
```

**Backend (.env)**:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CORS_ORIGINS=your_frontend_url
```

---

## 📊 Database Schema

### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  customer_address TEXT NOT NULL,
  customer_city VARCHAR(100) NOT NULL,
  customer_pincode VARCHAR(10) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  payment_status VARCHAR(20) NOT NULL,
  order_status VARCHAR(50) NOT NULL,
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  preparing_at TIMESTAMP WITH TIME ZONE,
  ready_at TIMESTAMP WITH TIME ZONE,
  out_for_delivery_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  cancelled_by VARCHAR(50),
  delivery_partner_name VARCHAR(255),
  delivery_partner_phone VARCHAR(20),
  delivery_partner_location TEXT,
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  refund_id VARCHAR(100),
  refund_status VARCHAR(50),
  refund_amount DECIMAL(10,2),
  refund_error TEXT,
  refund_completed_at TIMESTAMP WITH TIME ZONE
);
```

---

## 🔐 Security

- **Authentication**: Supabase Auth with Google OAuth and phone authentication
- **Payment Security**: Razorpay signature verification
- **CORS**: Configured for allowed origins
- **Environment Variables**: Sensitive data stored in .env files
- **Input Validation**: Pydantic models for API validation

---

## 🎨 UI/UX Features

- **Modern Design**: Purple gradient theme with glassmorphism
- **Responsive**: Works on all screen sizes
- **Animations**: Smooth transitions and micro-interactions
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Real-time feedback
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML and ARIA labels

---

## 📱 Key Features Breakdown

### 1. Product Catalog
- 2000+ products across multiple categories
- High-quality product images
- Detailed product information
- Price and discount display
- Weight/quantity options

### 2. Shopping Experience
- Smart search with suggestions
- Category-based browsing
- Product carousels
- Add to cart functionality
- Cart management

### 3. Checkout Process
- Location selection
- Customer information
- Payment method selection
- Order summary
- Payment processing

### 4. Order Management
- Real-time order tracking
- Status timeline
- Delivery partner information
- Cancellation options
- Refund processing

### 5. User Authentication
- Google OAuth login
- Phone number authentication
- User profile management
- Session management

---

## 🛡️ Order Cancellation Rules

### Allowed Cancellation Windows

| Order Status | Time Limit | Refund |
|-------------|------------|--------|
| `pending` | Anytime | N/A |
| `confirmed` | Within 2 minutes | 100% |
| `preparing` | Within 5 minutes | 100% |

### Denied Cancellation

| Order Status | Action |
|-------------|--------|
| `ready_for_pickup` | Contact support |
| `out_for_delivery` | Contact support |
| `nearby` | Contact support |
| `delivered` | Request refund via support |

---

## 💰 Payment Integration

### Razorpay
- UPI payments
- Credit/Debit cards
- Wallets (Paytm, PhonePe, etc.)
- Net banking
- EMI options

### Cash on Delivery
- Pay on delivery
- No online payment required

### Refund Processing
- Automatic refund initiation
- 5-7 business days processing
- Status tracking
- Email notifications

---

## 📞 Support

For issues or questions:
- Check API documentation at `/docs`
- Review backend logs
- Check Supabase dashboard
- Review Razorpay dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👥 Team

Developed by the Foodeo Team

---

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Loyalty program
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Subscription orders

---

## 📝 Version History

### v1.0.0 (Current)
- ✅ Complete e-commerce functionality
- ✅ Order tracking system
- ✅ Payment integration
- ✅ User authentication
- ✅ Testing dashboard
- ✅ Cancellation and refund system

---

**Built with ❤️ using React and FastAPI**
