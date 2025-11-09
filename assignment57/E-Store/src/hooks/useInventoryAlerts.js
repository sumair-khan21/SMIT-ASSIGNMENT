import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { notifyLowStock } from '../services/emailService';

export const useInventoryAlerts = (threshold = 10) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setLoading(true);

        const { data: products, error } = await supabase
          .from('pandaproducts')
          .select('*')
          .lte('stock', threshold)
          .order('stock', { ascending: true });

        if (error) throw error;

        const alertsList = products.map(product => ({
          id: product.id,
          title: product.title,
          stock: product.stock,
          price: product.price,
          category: product.category_name,
          image: product.image_url,
          severity: product.stock === 0 ? 'critical' : product.stock <= 5 ? 'high' : 'medium',
          message: product.stock === 0 
            ? 'Out of stock - Immediate action required'
            : `Only ${product.stock} units remaining`
        }));

        setAlerts(alertsList);

        // Send email notifications for critical items (optional)
        alertsList.forEach(alert => {
          if (alert.severity === 'critical') {
            notifyLowStock(alert);
          }
        });

        console.log(`⚠️ Found ${alertsList.length} inventory alerts`);
      } catch (error) {
        console.error('Error fetching inventory alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockProducts();

    // Refresh every 5 minutes
    const interval = setInterval(fetchLowStockProducts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [threshold]);

  return { alerts, loading };
};