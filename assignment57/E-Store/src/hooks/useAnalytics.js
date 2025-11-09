import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAnalytics = (timeRange = '30days') => {
  const [analytics, setAnalytics] = useState({
    salesByDay: [],
    salesByCategory: [],
    topCustomers: [],
    revenueGrowth: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    topSellingProducts: [],
    customerRetention: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // Calculate date range
        const now = new Date();
        const daysAgo = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
        const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

        // Fetch orders in date range
        const { data: orders } = await supabase
          .from('pandaorders')
          .select('*')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: true });

        // Fetch order items
        const { data: orderItems } = await supabase
          .from('pandaorder_items')
          .select('*');

        // 1. Sales by Day
        const salesByDay = calculateSalesByDay(orders || [], daysAgo);

        // 2. Sales by Category
        const salesByCategory = await calculateSalesByCategory(orderItems || []);

        // 3. Top Customers
        const topCustomers = calculateTopCustomers(orders || []);

        // 4. Revenue Growth
        const revenueGrowth = calculateRevenueGrowth(orders || [], daysAgo);

        // 5. Average Order Value
        const totalRevenue = orders?.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) || 0;
        const averageOrderValue = orders?.length ? totalRevenue / orders.length : 0;

        // 6. Top Selling Products
        const topSellingProducts = calculateTopSellingProducts(orderItems || []);

        setAnalytics({
          salesByDay,
          salesByCategory,
          topCustomers,
          revenueGrowth,
          averageOrderValue,
          conversionRate: 2.5, // This would come from tracking data
          topSellingProducts,
          customerRetention: 68, // This would be calculated from repeat customers
        });

      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return { analytics, loading };
};

// Helper functions
const calculateSalesByDay = (orders, days) => {
  const salesMap = {};
  const now = new Date();

  // Initialize all days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesMap[dateKey] = 0;
  }

  // Fill in actual sales
  orders.forEach(order => {
    const orderDate = new Date(order.created_at);
    const dateKey = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (salesMap.hasOwnProperty(dateKey)) {
      salesMap[dateKey] += parseFloat(order.total_amount);
    }
  });

  return Object.entries(salesMap).map(([date, sales]) => ({ date, sales }));
};

const calculateSalesByCategory = async (orderItems) => {
  const categoryMap = {};

  for (const item of orderItems) {
    if (!item.product_id) continue;

    // Fetch product to get category
    const { data: product } = await supabase
      .from('pandaproducts')
      .select('category_name')
      .eq('id', item.product_id)
      .single();

    const category = product?.category_name || 'Uncategorized';
    categoryMap[category] = (categoryMap[category] || 0) + parseFloat(item.total_price);
  }

  return Object.entries(categoryMap).map(([category, sales]) => ({
    category,
    sales,
    percentage: 0 // Calculate after getting total
  })).sort((a, b) => b.sales - a.sales);
};

const calculateTopCustomers = (orders) => {
  const customerMap = {};

  orders.forEach(order => {
    const email = order.customer_email;
    if (!customerMap[email]) {
      customerMap[email] = {
        email,
        name: order.customer_name,
        orders: 0,
        totalSpent: 0
      };
    }
    customerMap[email].orders += 1;
    customerMap[email].totalSpent += parseFloat(order.total_amount);
  });

  return Object.values(customerMap)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
};

const calculateRevenueGrowth = (orders, days) => {
  const midPoint = new Date(Date.now() - (days / 2) * 24 * 60 * 60 * 1000);
  
  let firstHalfRevenue = 0;
  let secondHalfRevenue = 0;

  orders.forEach(order => {
    const orderDate = new Date(order.created_at);
    if (orderDate < midPoint) {
      firstHalfRevenue += parseFloat(order.total_amount);
    } else {
      secondHalfRevenue += parseFloat(order.total_amount);
    }
  });

  if (firstHalfRevenue === 0) return 0;
  return ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100;
};

const calculateTopSellingProducts = (orderItems) => {
  const productMap = {};

  orderItems.forEach(item => {
    const key = item.product_id || item.product_name;
    if (!productMap[key]) {
      productMap[key] = {
        name: item.product_name,
        quantity: 0,
        revenue: 0
      };
    }
    productMap[key].quantity += item.quantity;
    productMap[key].revenue += parseFloat(item.total_price);
  });

  return Object.values(productMap)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};