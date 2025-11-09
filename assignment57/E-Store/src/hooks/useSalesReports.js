import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSalesReports = (reportType = 'daily', startDate = null, endDate = null) => {
  const [report, setReport] = useState({
    summary: {
      totalSales: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      totalItems: 0,
    },
    salesData: [],
    topProducts: [],
    topCategories: [],
    paymentMethods: [],
    orderStatuses: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateReport = async () => {
      try {
        setLoading(true);

        // Set default date range if not provided
        const end = endDate || new Date();
        const start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Fetch orders in date range
        const { data: orders, error: ordersError } = await supabase
          .from('pandaorders')
          .select('*')
          .gte('created_at', start.toISOString())
          .lte('created_at', end.toISOString())
          .order('created_at', { ascending: true });

        if (ordersError) throw ordersError;

        // Fetch order items
        const orderIds = orders.map(o => o.id);
        const { data: items, error: itemsError } = await supabase
          .from('pandaorder_items')
          .select('*')
          .in('order_id', orderIds);

        if (itemsError) throw itemsError;

        // Calculate summary
        const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

        // Group sales by period
        const salesData = groupSalesByPeriod(orders, reportType);

        // Top products
        const topProducts = calculateTopProducts(items);

        // Top categories
        const topCategories = await calculateTopCategories(items);

        // Payment methods distribution
        const paymentMethods = calculatePaymentMethods(orders);

        // Order statuses
        const orderStatuses = calculateOrderStatuses(orders);

        setReport({
          summary: {
            totalSales,
            totalOrders,
            averageOrderValue,
            totalItems,
          },
          salesData,
          topProducts,
          topCategories,
          paymentMethods,
          orderStatuses,
        });

      } catch (error) {
        console.error('Error generating sales report:', error);
      } finally {
        setLoading(false);
      }
    };

    generateReport();
  }, [reportType, startDate, endDate]);

  return { report, loading };
};

// Helper functions
const groupSalesByPeriod = (orders, reportType) => {
  const grouped = {};

  orders.forEach(order => {
    const date = new Date(order.created_at);
    let key;

    if (reportType === 'daily') {
      key = date.toLocaleDateString();
    } else if (reportType === 'weekly') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toLocaleDateString();
    } else if (reportType === 'monthly') {
      key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    if (!grouped[key]) {
      grouped[key] = { period: key, sales: 0, orders: 0 };
    }
    grouped[key].sales += parseFloat(order.total_amount);
    grouped[key].orders += 1;
  });

  return Object.values(grouped);
};

const calculateTopProducts = (items) => {
  const productMap = {};

  items.forEach(item => {
    const key = item.product_name;
    if (!productMap[key]) {
      productMap[key] = {
        name: item.product_name,
        quantity: 0,
        revenue: 0,
      };
    }
    productMap[key].quantity += item.quantity;
    productMap[key].revenue += parseFloat(item.total_price);
  });

  return Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
};

const calculateTopCategories = async (items) => {
  const categoryMap = {};

  for (const item of items) {
    if (!item.product_id) continue;

    const { data: product } = await supabase
      .from('pandaproducts')
      .select('category_name')
      .eq('id', item.product_id)
      .single();

    const category = product?.category_name || 'Uncategorized';
    
    if (!categoryMap[category]) {
      categoryMap[category] = { category, revenue: 0, items: 0 };
    }
    categoryMap[category].revenue += parseFloat(item.total_price);
    categoryMap[category].items += item.quantity;
  }

  return Object.values(categoryMap).sort((a, b) => b.revenue - a.revenue);
};

const calculatePaymentMethods = (orders) => {
  const methodMap = {};

  orders.forEach(order => {
    const method = order.payment_method || 'card';
    if (!methodMap[method]) {
      methodMap[method] = { method, count: 0, total: 0 };
    }
    methodMap[method].count += 1;
    methodMap[method].total += parseFloat(order.total_amount);
  });

  return Object.values(methodMap);
};

const calculateOrderStatuses = (orders) => {
  const statusMap = {};

  orders.forEach(order => {
    const status = order.status;
    if (!statusMap[status]) {
      statusMap[status] = { status, count: 0 };
    }
    statusMap[status].count += 1;
  });

  return Object.values(statusMap);
};