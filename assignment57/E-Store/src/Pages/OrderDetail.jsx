import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder, useCancelOrder } from '../hooks/useOrders';
import { 
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CreditCard,
  Calendar,
  ArrowLeft,
  Loader,
  AlertCircle,
  Mail,
  Phone,
  User,
  ShoppingBag,
  Download
} from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error } = useOrder(id);
  const { cancelOrder, loading: cancelling } = useCancelOrder();
  
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [message, setMessage] = useState('');

  // Get status config
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        label: 'Pending',
        description: 'Your order is being processed'
      },
      processing: {
        icon: Package,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'Processing',
        description: 'We are preparing your order'
      },
      shipped: {
        icon: Truck,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        label: 'Shipped',
        description: 'Your order is on the way'
      },
      delivered: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Delivered',
        description: 'Your order has been delivered'
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Cancelled',
        description: 'This order was cancelled'
      }
    };
    return configs[status] || configs.pending;
  };

  // Handle cancel order
  const handleCancelOrder = async () => {
    const result = await cancelOrder(id);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setShowCancelConfirm(false);
      // Reload order data
      window.location.reload();
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This order does not exist'}</p>
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Orders</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Order Details
              </h1>
              <p className="text-gray-600">Order #{order.order_number}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center space-x-2 px-4 py-2 ${statusConfig.bg} ${statusConfig.border} border rounded-xl ${statusConfig.color} font-semibold`}>
                <StatusIcon className="w-5 h-5" />
                <span>{statusConfig.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
            message.type === 'success' ? 'bg-green-50 border-2 border-green-200' :
            'bg-red-50 border-2 border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <span className={`text-sm ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>{message.text}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Status</h2>
              <div className={`p-6 rounded-xl ${statusConfig.bg} ${statusConfig.border} border-2`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`p-3 bg-white rounded-full ${statusConfig.color}`}>
                    <StatusIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${statusConfig.color}`}>
                      {statusConfig.label}
                    </h3>
                    <p className="text-gray-700">{statusConfig.description}</p>
                  </div>
                </div>
                
                {order.tracking_number && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                        <p className="font-mono font-bold text-gray-800">{order.tracking_number}</p>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium">
                        Track Package
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <span>Order Items ({order.items?.length || 0})</span>
              </h2>
              
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-24 h-24 object-contain rounded-lg bg-white p-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/96';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{item.product_name}</h4>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                        {item.size && (
                          <span className="px-2 py-1 bg-white rounded-lg border border-gray-200">
                            Size: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="px-2 py-1 bg-white rounded-lg border border-gray-200">
                            Color: {item.color}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-white rounded-lg border border-gray-200">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          ${item.unit_price.toFixed(2)} × {item.quantity}
                        </span>
                        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${item.total_price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>Shipping Address</span>
              </h2>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <p className="font-semibold text-gray-800 mb-3">{order.customer_name}</p>
                <div className="space-y-2 text-gray-600">
                  <p>{order.shipping_address}</p>
                  {order.shipping_city && (
                    <p>
                      {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
                    </p>
                  )}
                  <p>{order.shipping_country || 'United States'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Order Date */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shipping_cost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${order.shipping_cost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-gradient-to-r from-indigo-300 to-purple-300" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Total
                  </span>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${order.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {order.payment_method}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Info</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{order.customer_email}</span>
                </div>
                {order.customer_phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{order.customer_phone}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all border border-red-200"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Cancel Order</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Invoice</span>
                </button>

                {order.status === 'delivered' && (
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Again</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Cancel Order?</h3>
                <p className="text-gray-600">
                  Are you sure you want to cancel order #{order.order_number}? This action cannot be undone.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-70 flex items-center justify-center space-x-2"
                >
                  {cancelling ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Yes, Cancel</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;