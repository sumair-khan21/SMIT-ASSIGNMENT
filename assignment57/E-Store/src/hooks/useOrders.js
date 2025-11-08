import { useState, useEffect } from 'react';
import { getUserOrders, getOrderById, cancelOrder as cancelOrderService } from '../services/orderService';
import { useAuth } from '../Context/AuthContext';

// Hook to fetch all user orders
export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const result = await getUserOrders(user.id);
      
      if (result.success) {
        setOrders(result.orders || []);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return { orders, loading, error, refetch: fetchOrders };
};

// Hook to fetch single order
export const useOrder = (orderId) => {
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) return;
      
      try {
        setLoading(true);
        const result = await getOrderById(orderId, user.id);
        
        if (result.success) {
          setOrder(result.order);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  return { order, loading, error };
};

// Cancel order function
export const useCancelOrder = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const cancelOrder = async (orderId) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    setLoading(true);
    const result = await cancelOrderService(orderId, user.id);
    setLoading(false);
    
    return result;
  };

  return { cancelOrder, loading };
};