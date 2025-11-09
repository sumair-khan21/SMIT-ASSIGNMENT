import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
    ordersByStatus: {},
    revenueByMonth: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // 1. Total Products
        const { count: productCount } = await supabase
          .from('pandaproducts')
          .select('*', { count: 'exact', head: true });

        // 2. Total Orders & Revenue
        const { data: orders } = await supabase
          .from('pandaorders')
          .select('total_amount, status, created_at, customer_email');

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => {
          return sum + (parseFloat(order.total_amount) || 0);
        }, 0) || 0;

        // 3. Total Unique Customers
        const uniqueCustomers = new Set(orders?.map(order => order.customer_email)).size;

        // 4. Orders by Status
        const ordersByStatus = orders?.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {}) || {};

        // 5. Recent Orders (last 5)
        const { data: recentOrders } = await supabase
          .from('pandaorders')
          .select('id, order_number, customer_name, total_amount, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        // 6. Top Products (by stock or sales)
        const { data: topProducts } = await supabase
          .from('pandaproducts')
          .select('id, title, price, stock, rating_rate')
          .order('rating_rate', { ascending: false })
          .limit(5);

        // 7. Revenue by Month (last 6 months)
        const revenueByMonth = calculateRevenueByMonth(orders || []);

        setStats({
          totalProducts: productCount || 0,
          totalOrders,
          totalRevenue,
          totalCustomers: uniqueCustomers,
          recentOrders: recentOrders || [],
          topProducts: topProducts || [],
          ordersByStatus,
          revenueByMonth
        });

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

// Helper function to calculate revenue by month
const calculateRevenueByMonth = (orders) => {
  const months = {};
  const now = new Date();
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    months[monthKey] = 0;
  }

  // Calculate revenue for each month
  orders.forEach(order => {
    const orderDate = new Date(order.created_at);
    const monthKey = orderDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (months.hasOwnProperty(monthKey)) {
      months[monthKey] += parseFloat(order.total_amount) || 0;
    }
  });

  return Object.entries(months).map(([month, revenue]) => ({
    month,
    revenue
  }));
};