-- Supabase Schema Update for Order Tracking & Cancellation
-- Run this in Supabase SQL Editor to add new columns to orders table

-- Add delivery tracking columns
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS preparing_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS ready_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS out_for_delivery_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE;

-- Add delivery partner information
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivery_partner_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS delivery_partner_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS delivery_partner_location TEXT,
ADD COLUMN IF NOT EXISTS estimated_delivery_time TIMESTAMP WITH TIME ZONE;

-- Add cancellation tracking columns
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS cancelled_by VARCHAR(50);

-- Add refund tracking columns
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS refund_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS refund_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS refund_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS refund_error TEXT,
ADD COLUMN IF NOT EXISTS refund_completed_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_cancelled_at ON orders(cancelled_at);

-- Add comment to table
COMMENT ON TABLE orders IS 'Orders table with delivery tracking and cancellation support';
