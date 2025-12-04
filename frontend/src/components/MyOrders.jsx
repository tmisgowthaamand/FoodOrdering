import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin, Phone, RefreshCw, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './MyOrders.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const MyOrders = ({ onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [trackingData, setTrackingData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/orders`);
            const data = await response.json();
            // Sort by most recent first
            const sortedOrders = data.sort((a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            );
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderTracking = async (orderId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/tracking`);
            const data = await response.json();
            setTrackingData(data);
        } catch (error) {
            console.error('Error fetching tracking:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        fetchOrderTracking(order.id);
    };

    const handleCancelOrder = async (orderId) => {
        const reason = prompt('Please provide cancellation reason:');
        if (!reason) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/cancel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: orderId,
                    cancellation_reason: reason,
                    cancelled_by: 'customer'
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Order cancelled successfully!');
                if (data.refund_initiated) {
                    alert(`Refund of ₹${data.refund.amount} will be processed in 5-7 business days`);
                }
                fetchOrders();
                fetchOrderTracking(orderId);
            } else {
                alert(data.detail || 'Failed to cancel order');
            }
        } catch (error) {
            alert('Error cancelling order');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': '#FFA500',
            'confirmed': '#4CAF50',
            'preparing': '#2196F3',
            'ready_for_pickup': '#9C27B0',
            'out_for_delivery': '#FF9800',
            'nearby': '#FF5722',
            'delivered': '#4CAF50',
            'cancelled': '#F44336'
        };
        return colors[status] || '#757575';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': Clock,
            'confirmed': CheckCircle,
            'preparing': Package,
            'ready_for_pickup': Package,
            'out_for_delivery': Truck,
            'nearby': MapPin,
            'delivered': CheckCircle,
            'cancelled': XCircle
        };
        const Icon = icons[status] || Package;
        return <Icon className="status-icon" />;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} mins ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (selectedOrder && trackingData) {
        return (
            <div className="order-details-page">
                <div className="order-details-header">
                    <button onClick={() => setSelectedOrder(null)} className="back-button">
                        ← Back to Orders
                    </button>
                    <h1>Order Details</h1>
                </div>

                <div className="order-details-container">
                    {/* Order Status Card */}
                    <div className="status-card">
                        <div className="status-header" style={{ backgroundColor: getStatusColor(trackingData.order_status) }}>
                            {getStatusIcon(trackingData.order_status)}
                            <div>
                                <h2>{trackingData.order_status.replace(/_/g, ' ').toUpperCase()}</h2>
                                <p>{formatDate(trackingData.timeline.created_at)}</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="order-timeline">
                            <h3>Order Timeline</h3>
                            <div className="timeline-items">
                                {trackingData.timeline.created_at && (
                                    <div className="timeline-item completed">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Order Placed</strong>
                                            <span>{new Date(trackingData.timeline.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                                {trackingData.timeline.confirmed_at && (
                                    <div className="timeline-item completed">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Order Confirmed</strong>
                                            <span>{new Date(trackingData.timeline.confirmed_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                                {trackingData.timeline.preparing_at && (
                                    <div className="timeline-item completed">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Preparing</strong>
                                            <span>{new Date(trackingData.timeline.preparing_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                                {trackingData.timeline.out_for_delivery_at && (
                                    <div className="timeline-item completed">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Out for Delivery</strong>
                                            <span>{new Date(trackingData.timeline.out_for_delivery_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                                {trackingData.timeline.delivered_at ? (
                                    <div className="timeline-item completed">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Delivered</strong>
                                            <span>{new Date(trackingData.timeline.delivered_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : trackingData.timeline.cancelled_at ? (
                                    <div className="timeline-item cancelled">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Cancelled</strong>
                                            <span>{new Date(trackingData.timeline.cancelled_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="timeline-item pending">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>Delivery</strong>
                                            <span>Pending</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Partner Info */}
                        {trackingData.delivery.partner_name && (
                            <div className="delivery-partner-info">
                                <h3>Delivery Partner</h3>
                                <div className="partner-details">
                                    <div className="partner-name">
                                        <Truck size={20} />
                                        <span>{trackingData.delivery.partner_name}</span>
                                    </div>
                                    <a href={`tel:${trackingData.delivery.partner_phone}`} className="partner-phone">
                                        <Phone size={18} />
                                        Call Partner
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Cancel Button */}
                        {trackingData.can_cancel && (
                            <button
                                onClick={() => handleCancelOrder(trackingData.order_id)}
                                className="cancel-order-btn"
                            >
                                Cancel Order
                            </button>
                        )}

                        {/* Refund Info */}
                        {trackingData.refund && (
                            <div className="refund-info">
                                <h3>Refund Information</h3>
                                <div className="refund-details">
                                    <div className="refund-row">
                                        <span>Refund ID:</span>
                                        <strong>{trackingData.refund.refund_id}</strong>
                                    </div>
                                    <div className="refund-row">
                                        <span>Amount:</span>
                                        <strong>₹{trackingData.refund.refund_amount}</strong>
                                    </div>
                                    <div className="refund-row">
                                        <span>Status:</span>
                                        <strong className="refund-status">{trackingData.refund.refund_status}</strong>
                                    </div>
                                    <p className="refund-note">Refund will be credited within 5-7 business days</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="order-items-card">
                        <h3>Order Items ({selectedOrder.items.length})</h3>
                        <div className="items-list">
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>{item.weight}</p>
                                        <p className="item-quantity">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Item Total</span>
                                <span>₹{trackingData.total_amount}</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery Fee</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="price-row total">
                                <strong>Total Amount</strong>
                                <strong>₹{trackingData.total_amount}</strong>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="delivery-address">
                            <h4>Delivery Address</h4>
                            <p><strong>{trackingData.customer.name}</strong></p>
                            <p>{trackingData.customer.address}</p>
                            <p>{trackingData.customer.city}, {trackingData.customer.pincode}</p>
                            <p>Phone: {trackingData.customer.phone}</p>
                        </div>

                        {/* Payment Info */}
                        <div className="payment-info">
                            <h4>Payment Information</h4>
                            <div className="payment-row">
                                <span>Method:</span>
                                <strong>{trackingData.payment_method.toUpperCase()}</strong>
                            </div>
                            <div className="payment-row">
                                <span>Status:</span>
                                <strong className={`payment-status ${trackingData.payment_status}`}>
                                    {trackingData.payment_status}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-orders-page">
            <div className="orders-header">
                {onBack && (
                    <button onClick={onBack} className="back-button">
                        ← Back
                    </button>
                )}
                <h1>My Orders</h1>
                <button onClick={fetchOrders} className="refresh-button">
                    <RefreshCw size={20} />
                </button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading your orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="empty-orders">
                    <Package size={64} className="empty-icon" />
                    <h2>No Orders Yet</h2>
                    <p>Start shopping to see your orders here</p>
                    {onBack && (
                        <button onClick={onBack} className="start-shopping-btn">
                            Start Shopping
                        </button>
                    )}
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="order-card"
                            onClick={() => handleOrderClick(order)}
                        >
                            <div className="order-card-header">
                                <div className="order-status" style={{ color: getStatusColor(order.order_status) }}>
                                    {getStatusIcon(order.order_status)}
                                    <span>{order.order_status.replace(/_/g, ' ').toUpperCase()}</span>
                                </div>
                                <ChevronRight size={20} className="chevron" />
                            </div>

                            <div className="order-card-body">
                                <div className="order-info">
                                    <p className="order-id">Order #{order.id.slice(0, 8)}</p>
                                    <p className="order-date">{formatDate(order.created_at)}</p>
                                </div>

                                <div className="order-items-preview">
                                    {order.items.slice(0, 3).map((item, index) => (
                                        <div key={index} className="item-preview">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="more-items">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>

                                <div className="order-summary">
                                    <p className="items-count">{order.items.length} items</p>
                                    <p className="order-total">₹{order.total_amount}</p>
                                </div>
                            </div>

                            <div className="order-card-footer">
                                <span className="payment-method">{order.payment_method.toUpperCase()}</span>
                                {order.order_status === 'delivered' && (
                                    <button className="reorder-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        // Add reorder functionality
                                    }}>
                                        Reorder
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
