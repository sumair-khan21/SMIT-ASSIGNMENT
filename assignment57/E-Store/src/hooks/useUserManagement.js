import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all orders to get unique customers
      const { data: orders, error: ordersError } = await supabase
        .from('pandaorders')
        .select('customer_name, customer_email, customer_phone, user_id, created_at, total_amount');

      if (ordersError) throw ordersError;

      // Group by customer email
      const userMap = {};
      orders.forEach(order => {
        const email = order.customer_email;
        if (!userMap[email]) {
          userMap[email] = {
            email,
            name: order.customer_name,
            phone: order.customer_phone,
            user_id: order.user_id,
            totalOrders: 0,
            totalSpent: 0,
            lastOrderDate: order.created_at,
            firstOrderDate: order.created_at
          };
        }
        userMap[email].totalOrders += 1;
        userMap[email].totalSpent += parseFloat(order.total_amount);
        
        if (new Date(order.created_at) > new Date(userMap[email].lastOrderDate)) {
          userMap[email].lastOrderDate = order.created_at;
        }
        if (new Date(order.created_at) < new Date(userMap[email].firstOrderDate)) {
          userMap[email].firstOrderDate = order.created_at;
        }
      });

      setUsers(Object.values(userMap));
      console.log(`✅ Fetched ${Object.keys(userMap).length} users`);
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};