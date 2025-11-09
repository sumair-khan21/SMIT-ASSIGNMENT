import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Bell, X, ShoppingBag, Package, AlertTriangle, TrendingUp, Mail, Check } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved notifications from localStorage
    const saved = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    setNotifications(saved);
    setUnreadCount(saved.filter(n => !n.read).length);

    // Subscribe to new orders in real-time
    const ordersSubscription = supabase
      .channel('new-orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pandaorders'
        },
        (payload) => {
          console.log('🔔 New order received!', payload);
          addNotification({
            type: 'order',
            title: 'New Order Received!',
            message: `Order ${payload.new.order_number} from ${payload.new.customer_name}`,
            data: payload.new,
            icon: ShoppingBag,
            color: 'bg-green-500'
          });
        }
      )
      .subscribe();

    // Subscribe to order updates
    const orderUpdatesSubscription = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'pandaorders'
        },
        (payload) => {
          console.log('📝 Order updated!', payload);
          if (payload.new.status !== payload.old.status) {
            addNotification({
              type: 'update',
              title: 'Order Status Updated',
              message: `Order ${payload.new.order_number} is now ${payload.new.status}`,
              data: payload.new,
              icon: TrendingUp,
              color: 'bg-blue-500'
            });
          }
        }
      )
      .subscribe();

    // Subscribe to product changes (low stock)
    const productsSubscription = supabase
      .channel('product-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'pandaproducts'
        },
        (payload) => {
          console.log('📦 Product updated!', payload);
          // Check if stock is low
          if (payload.new.stock <= 5 && payload.new.stock !== payload.old.stock) {
            addNotification({
              type: 'alert',
              title: 'Low Stock Alert!',
              message: `${payload.new.title} - Only ${payload.new.stock} units left`,
              data: payload.new,
              icon: AlertTriangle,
              color: 'bg-red-500'
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      ordersSubscription.unsubscribe();
      orderUpdatesSubscription.unsubscribe();
      productsSubscription.unsubscribe();
    };
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem('adminNotifications', JSON.stringify(updated));
      return updated;
    });

    setUnreadCount(prev => prev + 1);

    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo192.png',
        badge: '/logo192.png'
      });
    }

    // Play notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzGL0fPTgjMGHm7A7+OZSA0PVqzn77BdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZSAwPVq/o77BdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZSA0PVqzn77FdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZSA0PVqzn77FdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZSA0PVqzn77FdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZSA0PVqzn77FdGAhKouX0wWkgB0CI0fPTgjMGHm7A7+OZ');
    audio.play().catch(() => {}); // Ignore errors
  };

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('adminNotifications', JSON.stringify(updated));
      return updated;
    });
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('adminNotifications', JSON.stringify(updated));
      return updated;
    });
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify([]));
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/80 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="p-2 border-b border-gray-200 flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="flex-1 px-3 py-2 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition-colors"
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-3 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No notifications</p>
                  <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-indigo-50/50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`${notification.color} p-2 rounded-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-900">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;