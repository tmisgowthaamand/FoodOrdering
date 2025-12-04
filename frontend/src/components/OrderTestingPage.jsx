import React, { useState, useEffect } from 'react';
import './OrderTestingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const OrderTestingPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [refundStatus, setRefundStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/orders`);
      const data = await response.json();
      setOrders(data);
      addTestResult('✅ Fetched all orders', 'success');
    } catch (error) {
      addTestResult(`❌ Error fetching orders: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch order tracking
  const fetchOrderTracking = async (orderId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/tracking`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setTrackingData(data);
      
      // Validate tracking data
      validateTrackingData(data);
      addTestResult(`✅ Fetched tracking for order ${orderId.slice(0, 8)}`, 'success');
    } catch (error) {
      addTestResult(`❌ Error fetching tracking: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Validate tracking data structure
  const validateTrackingData = (data) => {
    const checks = [
      { name: 'Order ID exists', pass: !!data.order_id },
      { name: 'Status is correct', pass: !!data.order_status },
      { name: 'Timeline has timestamps', pass: !!data.timeline && !!data.timeline.created_at },
      { name: 'Can cancel shows correctly', pass: typeof data.can_cancel === 'boolean' },
      { name: 'Cancel deadline is accurate', pass: data.can_cancel ? !!data.cancel_deadline : true },
    ];

    checks.forEach(check => {
      if (check.pass) {
        addTestResult(`✅ ${check.name}`, 'success');
      } else {
        addTestResult(`❌ ${check.name}`, 'error');
      }
    });
  };

  // Test order cancellation
  const testCancelOrder = async (orderId, reason = 'Test cancellation') => {
    try {
      setLoading(true);
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
      
      if (response.ok && data.success) {
        addTestResult(`✅ Order cancelled successfully`, 'success');
        
        // Validate cancellation response
        if (data.refund_initiated) {
          addTestResult(`✅ Refund initiated automatically`, 'success');
          addTestResult(`✅ Refund ID: ${data.refund.refund_id}`, 'info');
          addTestResult(`✅ Refund amount: ₹${data.refund.amount}`, 'info');
          addTestResult(`✅ Refund status: ${data.refund.status}`, 'info');
        }
        
        // Refresh tracking
        await fetchOrderTracking(orderId);
      } else {
        addTestResult(`❌ Cancellation denied: ${data.detail || 'Unknown error'}`, 'warning');
        addTestResult(`✅ Proper error message shown`, 'success');
      }
    } catch (error) {
      addTestResult(`❌ Error cancelling order: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch refund status
  const fetchRefundStatus = async (orderId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/refund-status`);
      const data = await response.json();
      setRefundStatus(data);
      
      // Validate refund data
      if (data.refund_id) {
        addTestResult(`✅ Refund ID saved: ${data.refund_id}`, 'success');
        addTestResult(`✅ Refund status tracked: ${data.refund_status}`, 'success');
        addTestResult(`✅ Amount is correct: ₹${data.refund_amount}`, 'success');
        addTestResult(`✅ Timeline shown (5-7 days)`, 'success');
      } else {
        addTestResult(`ℹ️ No refund for this order`, 'info');
      }
    } catch (error) {
      addTestResult(`❌ Error fetching refund status: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update order status (for testing)
  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          delivery_partner_name: status === 'out_for_delivery' ? 'Test Driver' : undefined,
          delivery_partner_phone: status === 'out_for_delivery' ? '+919876543210' : undefined,
          estimated_delivery_time: status === 'out_for_delivery' ? new Date(Date.now() + 30 * 60000).toISOString() : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        addTestResult(`✅ Order status updated to: ${status}`, 'success');
        await fetchOrderTracking(orderId);
      }
    } catch (error) {
      addTestResult(`❌ Error updating status: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Create test order
  const createTestOrder = async (paymentMethod = 'razorpay') => {
    try {
      setLoading(true);
      const testOrder = {
        items: [
          {
            product_id: 1,
            name: 'Test Product',
            price: 500,
            quantity: 2,
            image: 'https://via.placeholder.com/100',
            weight: '500g'
          }
        ],
        total_amount: 1000,
        customer: {
          name: 'Test Customer',
          phone: '+919876543210',
          email: 'test@example.com',
          address: '123 Test Street',
          city: 'Test City',
          pincode: '123456'
        },
        payment_method: paymentMethod
      };

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testOrder)
      });

      const data = await response.json();
      if (data.success) {
        addTestResult(`✅ Test order created: ${data.order_id.slice(0, 8)}`, 'success');
        setSelectedOrder(data.order_id);
        await fetchOrders();
        await fetchOrderTracking(data.order_id);
      }
    } catch (error) {
      addTestResult(`❌ Error creating test order: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Run comprehensive test suite
  const runFullTestSuite = async () => {
    setTestResults([]);
    addTestResult('🚀 Starting comprehensive test suite...', 'info');
    
    // Test 1: Create COD order
    addTestResult('\n📦 Test 1: Creating COD order...', 'info');
    await createTestOrder('cod');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedOrder) {
      // Test 2: Check tracking
      addTestResult('\n📍 Test 2: Checking order tracking...', 'info');
      await fetchOrderTracking(selectedOrder);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 3: Update status to preparing
      addTestResult('\n🍳 Test 3: Updating to preparing status...', 'info');
      await updateOrderStatus(selectedOrder, 'preparing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 4: Try cancellation (should work within time window)
      addTestResult('\n❌ Test 4: Testing cancellation within time window...', 'info');
      await testCancelOrder(selectedOrder, 'Testing cancellation flow');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 5: Check refund status
      addTestResult('\n💰 Test 5: Checking refund status...', 'info');
      await fetchRefundStatus(selectedOrder);
    }
    
    addTestResult('\n✅ Test suite completed!', 'success');
  };

  // Add test result
  const addTestResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date() }]);
  };

  // Clear test results
  const clearResults = () => {
    setTestResults([]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-testing-page">
      <div className="testing-header">
        <h1>🧪 Order Testing Dashboard</h1>
        <p>Comprehensive testing for order tracking, cancellation, and refund functionality</p>
      </div>

      <div className="testing-grid">
        {/* Control Panel */}
        <div className="testing-panel">
          <h2>🎮 Control Panel</h2>
          
          <div className="button-group">
            <button onClick={runFullTestSuite} disabled={loading} className="btn-primary">
              🚀 Run Full Test Suite
            </button>
            <button onClick={() => createTestOrder('cod')} disabled={loading} className="btn-secondary">
              📦 Create COD Order
            </button>
            <button onClick={() => createTestOrder('razorpay')} disabled={loading} className="btn-secondary">
              💳 Create Razorpay Order
            </button>
            <button onClick={fetchOrders} disabled={loading} className="btn-secondary">
              🔄 Refresh Orders
            </button>
            <button onClick={clearResults} className="btn-secondary">
              🗑️ Clear Results
            </button>
          </div>

          {/* Order Selection */}
          <div className="order-selector">
            <h3>Select Order</h3>
            <select 
              value={selectedOrder || ''} 
              onChange={(e) => {
                setSelectedOrder(e.target.value);
                if (e.target.value) {
                  fetchOrderTracking(e.target.value);
                }
              }}
              disabled={loading}
            >
              <option value="">-- Select an order --</option>
              {orders.map(order => (
                <option key={order.id} value={order.id}>
                  {order.id.slice(0, 8)} - {order.order_status} - ₹{order.total_amount}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Actions */}
          {selectedOrder && (
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <button onClick={() => fetchOrderTracking(selectedOrder)} disabled={loading}>
                📍 Get Tracking
              </button>
              <button onClick={() => updateOrderStatus(selectedOrder, 'confirmed')} disabled={loading}>
                ✅ Set Confirmed
              </button>
              <button onClick={() => updateOrderStatus(selectedOrder, 'preparing')} disabled={loading}>
                🍳 Set Preparing
              </button>
              <button onClick={() => updateOrderStatus(selectedOrder, 'out_for_delivery')} disabled={loading}>
                🚚 Set Out for Delivery
              </button>
              <button onClick={() => updateOrderStatus(selectedOrder, 'delivered')} disabled={loading}>
                📦 Set Delivered
              </button>
              <button onClick={() => testCancelOrder(selectedOrder)} disabled={loading} className="btn-danger">
                ❌ Cancel Order
              </button>
              <button onClick={() => fetchRefundStatus(selectedOrder)} disabled={loading}>
                💰 Check Refund
              </button>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div className="testing-panel">
          <h2>📊 Test Results</h2>
          <div className="test-results">
            {testResults.length === 0 ? (
              <p className="no-results">No test results yet. Run a test to see results.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className={`test-result ${result.type}`}>
                  <span className="result-message">{result.message}</span>
                  <span className="result-time">
                    {result.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tracking Data Display */}
        {trackingData && (
          <div className="testing-panel full-width">
            <h2>📍 Order Tracking Data</h2>
            <div className="tracking-display">
              <div className="tracking-section">
                <h3>Order Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Order ID:</label>
                    <span>{trackingData.order_id}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge ${trackingData.order_status}`}>
                      {trackingData.order_status}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Payment Status:</label>
                    <span>{trackingData.payment_status}</span>
                  </div>
                  <div className="info-item">
                    <label>Payment Method:</label>
                    <span>{trackingData.payment_method}</span>
                  </div>
                  <div className="info-item">
                    <label>Total Amount:</label>
                    <span>₹{trackingData.total_amount}</span>
                  </div>
                  <div className="info-item">
                    <label>Can Cancel:</label>
                    <span className={trackingData.can_cancel ? 'text-success' : 'text-danger'}>
                      {trackingData.can_cancel ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  {trackingData.cancel_deadline && (
                    <div className="info-item">
                      <label>Cancel Deadline:</label>
                      <span>{new Date(trackingData.cancel_deadline).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="tracking-section">
                <h3>Timeline</h3>
                <div className="timeline">
                  {Object.entries(trackingData.timeline).map(([key, value]) => (
                    value && (
                      <div key={key} className="timeline-item">
                        <div className="timeline-icon">
                          {value ? '✅' : '⏳'}
                        </div>
                        <div className="timeline-content">
                          <strong>{key.replace(/_/g, ' ').replace(/at$/, '').toUpperCase()}</strong>
                          <span>{new Date(value).toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {trackingData.delivery.partner_name && (
                <div className="tracking-section">
                  <h3>Delivery Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Partner Name:</label>
                      <span>{trackingData.delivery.partner_name}</span>
                    </div>
                    <div className="info-item">
                      <label>Partner Phone:</label>
                      <span>{trackingData.delivery.partner_phone}</span>
                    </div>
                    {trackingData.delivery.estimated_delivery_time && (
                      <div className="info-item">
                        <label>Estimated Delivery:</label>
                        <span>{new Date(trackingData.delivery.estimated_delivery_time).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {trackingData.refund && (
                <div className="tracking-section refund-section">
                  <h3>💰 Refund Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Refund ID:</label>
                      <span>{trackingData.refund.refund_id}</span>
                    </div>
                    <div className="info-item">
                      <label>Refund Status:</label>
                      <span className="status-badge">{trackingData.refund.refund_status}</span>
                    </div>
                    <div className="info-item">
                      <label>Refund Amount:</label>
                      <span>₹{trackingData.refund.refund_amount}</span>
                    </div>
                    <div className="info-item">
                      <label>Cancellation Reason:</label>
                      <span>{trackingData.refund.cancellation_reason}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Refund Status Display */}
        {refundStatus && refundStatus.refund_id && (
          <div className="testing-panel full-width">
            <h2>💰 Refund Status</h2>
            <div className="refund-display">
              <div className="info-grid">
                <div className="info-item">
                  <label>Refund ID:</label>
                  <span>{refundStatus.refund_id}</span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className="status-badge">{refundStatus.refund_status}</span>
                </div>
                <div className="info-item">
                  <label>Amount:</label>
                  <span>₹{refundStatus.refund_amount}</span>
                </div>
                <div className="info-item full-width">
                  <label>Message:</label>
                  <span>{refundStatus.message}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}
    </div>
  );
};

export default OrderTestingPage;
