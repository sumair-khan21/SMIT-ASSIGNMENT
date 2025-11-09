import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabaseClient';

// ============================================
// ADMIN HOOK: Fetch ALL Orders (not filtered by user)
// ============================================
export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✨ Fetch ALL orders (no user filter - this is for admin)
      const { data, error } = await supabase
        .from('pandaorders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      console.log(`✅ Admin: Fetched ${data?.length || 0} orders from Supabase`);
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
};

// ============================================
// ADMIN HOOK: Fetch Single Order with Items
// ============================================
// In src/hooks/useAdminOrders.js

export const useAdminOrder = (id) => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch order
        const { data: orderData, error: orderError } = await supabase
          .from('pandaorders')
          .select('*')
          .eq('id', id)
          .single();

        if (orderError) throw orderError;

        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from('pandaorder_items')
          .select('*')
          .eq('order_id', id);

        if (itemsError) throw itemsError;

        setOrder(orderData);
        setOrderItems(itemsData || []); // ✅ Ensure it's always an array
        console.log('✅ Admin: Fetched order details');
      } catch (err) {
        setError(err.message);
        console.error('❌ Error fetching admin order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return { order, orderItems, loading, error };
};
// ============================================
// ADMIN ORDER OPERATIONS
// ============================================
export const adminOrderOperations = {
  // UPDATE order status
  updateStatus: async (id, status) => {
    try {
      const { data, error } = await supabase
        .from('pandaorders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Order status updated:', status);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      return handleSupabaseError(error);
    }
  },

  // UPDATE payment status
  updatePaymentStatus: async (id, paymentStatus) => {
    try {
      const { data, error } = await supabase
        .from('pandaorders')
        .update({ payment_status: paymentStatus })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Payment status updated:', paymentStatus);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error updating payment status:', error);
      return handleSupabaseError(error);
    }
  },

  // UPDATE tracking number
  updateTracking: async (id, trackingNumber) => {
    try {
      const { data, error } = await supabase
        .from('pandaorders')
        .update({ tracking_number: trackingNumber })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Tracking number updated');
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error updating tracking:', error);
      return handleSupabaseError(error);
    }
  },

  // DELETE order (admin only)
  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('pandaorders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Order deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      return handleSupabaseError(error);
    }
  },
};