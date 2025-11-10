import { supabase } from '../lib/supabaseClient';

// Track order by tracking number (public - no auth required)
export const trackOrder = async (trackingNumber) => {
  try {
    if (!trackingNumber) {
      return { success: false, error: 'Tracking number is required' };
    }

    // Query without RLS - public tracking
    const { data, error } = await supabase
      .from('pandaorders')
      .select(`
        id,
        order_number,
        tracking_number,
        customer_name,
        status,
        payment_status,
        carrier,
        tracking_url,
        total_amount,
        created_at,
        shipped_at,
        delivered_at,
        estimated_delivery,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip
      `)
      .eq('tracking_number', trackingNumber.trim().toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { success: false, error: 'Tracking number not found' };
      }
      throw error;
    }

    // Get order items
    const { data: items, error: itemsError } = await supabase
      .from('pandaorder_items')
      .select('*')
      .eq('order_id', data.id);

    if (itemsError) throw itemsError;

    return {
      success: true,
      order: data,
      items: items || []
    };
  } catch (error) {
    console.error('Error tracking order:', error);
    return { success: false, error: error.message };
  }
};

// Get tracking timeline/history
export const getTrackingTimeline = (order) => {
  const timeline = [];

  // Order Placed
  timeline.push({
    status: 'placed',
    title: 'Order Placed',
    description: `Your order ${order.order_number} has been placed successfully`,
    timestamp: order.created_at,
    completed: true,
    icon: '📝'
  });

  // Payment Confirmed
  if (order.payment_status === 'paid') {
    timeline.push({
      status: 'paid',
      title: 'Payment Confirmed',
      description: 'Your payment has been confirmed',
      timestamp: order.created_at,
      completed: true,
      icon: '💳'
    });
  }

  // Processing
  if (['processing', 'shipped', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'processing',
      title: 'Order Processing',
      description: 'Your order is being prepared',
      timestamp: order.created_at,
      completed: true,
      icon: '📦'
    });
  }

  // Shipped
  if (['shipped', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'shipped',
      title: 'Order Shipped',
      description: order.carrier ? `Shipped via ${order.carrier}` : 'Your order is on the way',
      timestamp: order.shipped_at || order.updated_at,
      completed: true,
      icon: '🚚'
    });
  }

  // Out for Delivery
  if (order.status === 'delivered') {
    timeline.push({
      status: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      timestamp: order.delivered_at || order.updated_at,
      completed: true,
      icon: '🏃'
    });
  }

  // Delivered
  if (order.status === 'delivered') {
    timeline.push({
      status: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered successfully',
      timestamp: order.delivered_at || order.updated_at,
      completed: true,
      icon: '✅'
    });
  } else {
    // Expected delivery
    timeline.push({
      status: 'delivery',
      title: 'Estimated Delivery',
      description: order.estimated_delivery 
        ? `Expected on ${new Date(order.estimated_delivery).toLocaleDateString()}`
        : 'Delivery date will be updated soon',
      timestamp: order.estimated_delivery,
      completed: false,
      icon: '📅'
    });
  }

  // Cancelled
  if (order.status === 'cancelled') {
    timeline.push({
      status: 'cancelled',
      title: 'Order Cancelled',
      description: 'This order has been cancelled',
      timestamp: order.updated_at,
      completed: true,
      icon: '❌'
    });
  }

  return timeline;
};

// Generate shareable tracking link
export const getTrackingLink = (trackingNumber) => {
  return `${window.location.origin}/track/${trackingNumber}`;
};