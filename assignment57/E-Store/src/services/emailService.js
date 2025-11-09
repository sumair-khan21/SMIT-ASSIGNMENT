import { Resend } from 'resend';

// Initialize Resend (for backend/API routes only)
// For React, we'll use a backend endpoint instead

// Email Templates
const emailTemplates = {
  orderConfirmation: (order) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 20px; font-weight: bold; color: #667eea; margin-top: 20px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your purchase</p>
          </div>
          <div class="content">
            <p>Hi ${order.customer_name},</p>
            <p>Your order has been confirmed and is being processed.</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> ${order.order_number}</p>
              <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span style="color: #667eea;">${order.status.toUpperCase()}</span></p>
              
              <div style="margin-top: 20px;">
                <h4>Shipping Address:</h4>
                <p>${order.shipping_address}<br>
                ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}</p>
              </div>
              
              <div class="total">
                <p>Total: $${parseFloat(order.total_amount).toFixed(2)}</p>
              </div>
            </div>
            
            <p>We'll send you another email when your order ships.</p>
            
            <a href="${window.location.origin}/orders/${order.id}" class="button">Track Your Order</a>
          </div>
          <div class="footer">
            <p>Questions? Contact us at support@yourstore.com</p>
            <p>© 2024 Your Store. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  orderShipped: (order) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .tracking-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .tracking-number { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Your Order Has Shipped!</h1>
          </div>
          <div class="content">
            <p>Hi ${order.customer_name},</p>
            <p>Great news! Your order <strong>${order.order_number}</strong> is on its way!</p>
            
            <div class="tracking-box">
              <p>Tracking Number:</p>
              <p class="tracking-number">${order.tracking_number || 'Processing...'}</p>
              <p style="margin-top: 20px;">Estimated Delivery: ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : 'TBD'}</p>
            </div>
            
            <p>You can track your package using the tracking number above.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  lowStockAlert: (product) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Low Stock Alert</h1>
          </div>
          <div class="alert">
            <h3>${product.title}</h3>
            <p><strong>Current Stock:</strong> ${product.stock} units</p>
            <p><strong>Product ID:</strong> ${product.id}</p>
            <p style="color: #856404;">⚠️ This product is running low on inventory. Please restock soon.</p>
          </div>
        </div>
      </body>
    </html>
  `,
};

// Email sending functions (these should be called from backend/API routes)
export const sendOrderConfirmation = async (order) => {
  try {
    // In production, this should be called from a backend API
    console.log('📧 Sending order confirmation email...');
    console.log('To:', order.customer_email);
    console.log('Order:', order.order_number);
    
    // Simulate email send
    return { success: true, message: 'Order confirmation email sent!' };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

export const sendOrderShippedEmail = async (order) => {
  try {
    console.log('📧 Sending shipping notification...');
    console.log('To:', order.customer_email);
    console.log('Tracking:', order.tracking_number);
    
    return { success: true, message: 'Shipping notification sent!' };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

export const sendLowStockAlert = async (product, adminEmail) => {
  try {
    console.log('📧 Sending low stock alert...');
    console.log('Product:', product.title);
    console.log('Stock:', product.stock);
    
    return { success: true, message: 'Low stock alert sent!' };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Client-side notification (shows notification instead of sending email)
export const notifyOrderConfirmation = (order) => {
  const notification = {
    type: 'success',
    title: 'Order Confirmed!',
    message: `Order ${order.order_number} - Confirmation email sent to ${order.customer_email}`,
    html: emailTemplates.orderConfirmation(order)
  };
  
  // Store in localStorage for demo
  const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
  notifications.push({ ...notification, timestamp: new Date().toISOString() });
  localStorage.setItem('emailNotifications', JSON.stringify(notifications.slice(-10)));
  
  return notification;
};

export const notifyOrderShipped = (order) => {
  const notification = {
    type: 'info',
    title: 'Order Shipped!',
    message: `Order ${order.order_number} - Shipping notification sent to ${order.customer_email}`,
    html: emailTemplates.orderShipped(order)
  };
  
  const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
  notifications.push({ ...notification, timestamp: new Date().toISOString() });
  localStorage.setItem('emailNotifications', JSON.stringify(notifications.slice(-10)));
  
  return notification;
};

export const notifyLowStock = (product) => {
  const notification = {
    type: 'warning',
    title: 'Low Stock Alert!',
    message: `${product.title} - Only ${product.stock} units remaining`,
    html: emailTemplates.lowStockAlert(product)
  };
  
  const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
  notifications.push({ ...notification, timestamp: new Date().toISOString() });
  localStorage.setItem('emailNotifications', JSON.stringify(notifications.slice(-10)));
  
  return notification;
};

export { emailTemplates };