// ⚠️ IMPORTANT: This should be called from a backend/serverless function
// Never expose your Resend API key on the client side!

// For demo purposes, we'll create the structure
// You'll need to implement these on your backend

const BACKEND_API_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api';

// Email templates
const createOrderConfirmationHTML = (order) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 32px; }
    .content { padding: 40px 20px; }
    .order-box { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .order-number { font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 16px; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e9ecef; }
    .detail-label { color: #6c757d; font-weight: 500; }
    .detail-value { color: #212529; font-weight: 600; }
    .total { font-size: 24px; color: #28a745; margin-top: 16px; }
    .button { display: inline-block; background: #667eea; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin-top: 24px; font-weight: 600; }
    .footer { background: #f8f9fa; padding: 24px; text-align: center; color: #6c757d; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Order Confirmed!</h1>
      <p style="color: #ffffff; margin: 8px 0 0 0;">Thank you for your purchase</p>
    </div>
    
    <div class="content">
      <p style="font-size: 16px; color: #212529;">Hi ${order.customer_name},</p>
      <p style="color: #6c757d; line-height: 1.6;">Your order has been confirmed and is being prepared for shipment. We'll send you another email when it ships.</p>
      
      <div class="order-box">
        <div class="order-number">Order #${order.order_number}</div>
        
        <div class="detail-row">
          <span class="detail-label">Order Date</span>
          <span class="detail-value">${new Date(order.created_at).toLocaleDateString()}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Status</span>
          <span class="detail-value" style="color: #667eea; text-transform: uppercase;">${order.status}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Payment Method</span>
          <span class="detail-value">${order.payment_method || 'Card'}</span>
        </div>
        
        <div class="detail-row" style="border-bottom: none;">
          <span class="detail-label">Shipping Address</span>
          <span class="detail-value" style="text-align: right;">
            ${order.shipping_address}<br>
            ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}
          </span>
        </div>
        
        <div class="total">
          Total: $${parseFloat(order.total_amount).toFixed(2)}
        </div>
      </div>
      
      <p style="color: #6c757d;">You can track your order status at any time:</p>
      <a href="${window.location.origin}/orders/${order.id}" class="button">Track Your Order</a>
    </div>
    
    <div class="footer">
      <p>Questions? Contact us at <a href="mailto:support@yourstore.com" style="color: #667eea;">support@yourstore.com</a></p>
      <p style="margin-top: 16px;">© ${new Date().getFullYear()} Your Store. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const createOrderShippedHTML = (order) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 40px 20px; text-align: center; }
    .tracking-box { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center; }
    .tracking-number { font-size: 28px; font-weight: bold; color: #28a745; letter-spacing: 2px; padding: 16px; background: #ffffff; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #ffffff; margin: 0;">📦 Your Order Has Shipped!</h1>
    </div>
    
    <div style="padding: 40px 20px;">
      <p style="font-size: 16px;">Hi ${order.customer_name},</p>
      <p style="color: #6c757d; line-height: 1.6;">Great news! Your order <strong>${order.order_number}</strong> is on its way to you!</p>
      
      <div class="tracking-box">
        <p style="color: #6c757d; margin: 0 0 16px 0;">Tracking Number</p>
        <div class="tracking-number">${order.tracking_number || 'Processing...'}</div>
        <p style="color: #6c757d; margin: 16px 0 0 0;">Estimated Delivery: ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : 'TBD'}</p>
      </div>
      
      <p style="color: #6c757d;">Track your package using the tracking number above with your preferred carrier.</p>
    </div>
  </div>
</body>
</html>
`;

// Send email via backend API
export const sendOrderConfirmationEmail = async (order) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'order_confirmation',
        to: order.customer_email,
        subject: `Order Confirmation - ${order.order_number}`,
        html: createOrderConfirmationHTML(order),
        order: order
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Order confirmation email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Fallback: Show in-app notification
    return { success: false, error: error.message };
  }
};

export const sendOrderShippedEmail = async (order) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'order_shipped',
        to: order.customer_email,
        subject: `Your Order Has Shipped - ${order.order_number}`,
        html: createOrderShippedHTML(order),
        order: order
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Shipping notification email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendLowStockAlertEmail = async (product, adminEmail = 'admin@yourstore.com') => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'low_stock_alert',
        to: adminEmail,
        subject: `Low Stock Alert - ${product.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #dc3545;">⚠️ Low Stock Alert</h2>
            <p><strong>Product:</strong> ${product.title}</p>
            <p><strong>Current Stock:</strong> ${product.stock} units</p>
            <p><strong>Product ID:</strong> ${product.id}</p>
            <p style="color: #856404;">This product is running low on inventory. Please restock soon.</p>
          </div>
        `,
        product: product
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Low stock alert email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};