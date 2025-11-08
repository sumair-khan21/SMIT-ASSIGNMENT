import { supabase } from '../lib/supabaseClient';

// Create a new order
export const createOrder = async (orderData, cartItems, userId) => {
  try {
    console.log('Creating order...', { orderData, cartItems, userId });

    // Calculate totals - IMPORTANT: Convert to proper decimal format
    const subtotal = parseFloat(
      cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (price * quantity);
      }, 0).toFixed(2)
    );

    const shippingCost = parseFloat((subtotal >= 50 ? 0 : 10).toFixed(2));
    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    const totalAmount = parseFloat((subtotal + shippingCost + tax).toFixed(2));

    console.log('Calculated totals:', { subtotal, shippingCost, tax, totalAmount });

    // Prepare order data with explicit type conversion
    const orderPayload = {
      user_id: userId,
      customer_name: orderData.fullName,
      customer_email: orderData.email,
      customer_phone: orderData.phone || '',
      shipping_address: orderData.address,
      shipping_city: orderData.city || '',
      shipping_state: orderData.state || '',
      shipping_zip: orderData.zipCode || '',
      subtotal: subtotal,
      shipping_cost: shippingCost,
      tax: tax,
      total_amount: totalAmount,
      status: 'pending',
      payment_status: 'pending',
      payment_method: orderData.paymentMethod || 'card'
    };

    console.log('Order payload:', orderPayload);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('pandaorders')
      .insert([orderPayload])
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw orderError;
    }

    console.log('Order created:', order);

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.title,
      product_image: item.image_url || item.image,
      product_price: parseFloat(item.price),
      quantity: parseInt(item.quantity) || 1,
      size: item.selectedSize || null,
      color: item.selectedColor || null,
      unit_price: parseFloat(item.price),
      total_price: parseFloat((parseFloat(item.price) * (parseInt(item.quantity) || 1)).toFixed(2))
    }));

    console.log('Creating order items:', orderItems);

    const { error: itemsError } = await supabase
      .from('pandaorder_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
      throw itemsError;
    }

    console.log('Order items created successfully');

    return { 
      success: true, 
      order,
      message: 'Order placed successfully!' 
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create order'
    };
  }
};

// Get user orders
export const getUserOrders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('pandaorders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, orders: data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: error.message };
  }
};

// Get single order with items
export const getOrderById = async (orderId, userId) => {
  try {
    // Get order
    const { data: order, error: orderError } = await supabase
      .from('pandaorders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (orderError) throw orderError;

    // Get order items
    const { data: items, error: itemsError } = await supabase
      .from('pandaorder_items')
      .select('*')
      .eq('order_id', orderId);

    if (itemsError) throw itemsError;

    return { 
      success: true, 
      order: { ...order, items } 
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
};

// Cancel order
export const cancelOrder = async (orderId, userId) => {
  try {
    const { data, error } = await supabase
      .from('pandaorders')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { 
      success: true, 
      order: data,
      message: 'Order cancelled successfully' 
    };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return { success: false, error: error.message };
  }
};