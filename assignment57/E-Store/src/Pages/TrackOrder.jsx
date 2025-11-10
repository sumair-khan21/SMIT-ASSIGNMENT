import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackOrder, getTrackingTimeline, getTrackingLink } from '../services/trackingService';
import { Package, MapPin, Calendar, CheckCircle, Clock, Truck, Copy, Search, ArrowLeft } from 'lucide-react';

const TrackOrder = () => {
  const { trackingNumber: urlTrackingNumber } = useParams();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || '');
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (urlTrackingNumber) {
      handleTrack(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  const handleTrack = async (number = trackingNumber) => {
    if (!number.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    const result = await trackOrder(number);

    if (result.success) {
      setOrder(result.order);
      setItems(result.items);
      setTimeline(getTrackingTimeline(result.order));
      
      // Update URL if tracking via search
      if (!urlTrackingNumber) {
        navigate(`/track/${number.trim().toUpperCase()}`, { replace: true });
      }
    } else {
      setError(result.error || 'Order not found. Please check your tracking number.');
    }

    setLoading(false);
  };

  const handleCopyTracking = () => {
    const link = getTrackingLink(order.tracking_number);
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">Enter your tracking number to see order details</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="Enter tracking number (e.g., TRK-20240115-ABC123)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-lg"
              />
            </div>
            <button
              onClick={() => handleTrack()}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Tracking...
                </span>
              ) : (
                'Track Order'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Order {order.order_number}
                  </h2>
                  <p className="text-gray-600">Tracking: {order.tracking_number}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyTracking}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Tracking Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Shipping Address</p>
                    <p className="text-gray-600 mt-1">
                      {order.shipping_address}<br />
                      {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Estimated Delivery</p>
                    <p className="text-gray-600 mt-1">
                      {order.estimated_delivery 
                        ? new Date(order.estimated_delivery).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : 'To be updated'}
                    </p>
                  </div>
                </div>

                {order.carrier && (
                  <div className="flex items-start space-x-3">
                    <Truck className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Carrier</p>
                      <p className="text-gray-600 mt-1">{order.carrier}</p>
                      {order.tracking_url && (
                        <a 
                          href={order.tracking_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          Track on carrier website →
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Package className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Order Total</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      ${parseFloat(order.total_amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h3>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {timeline.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      {/* Icon */}
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                        step.completed 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 border-white shadow-lg' 
                          : 'bg-white border-gray-300'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="ml-6 flex-1">
                        <div className={`p-4 rounded-xl ${
                          step.completed 
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200' 
                            : 'bg-gray-50 border-2 border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-bold ${step.completed ? 'text-indigo-900' : 'text-gray-500'}`}>
                              {step.icon} {step.title}
                            </h4>
                            {step.timestamp && (
                              <span className="text-sm text-gray-500">
                                {new Date(step.timestamp).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            )}
                          </div>
                          <p className={step.completed ? 'text-gray-700' : 'text-gray-500'}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      {item.product_image && (
                        <img 
                          src={item.product_image} 
                          alt={item.product_name}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">${item.total_price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!order && !loading && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">
              Your tracking number can be found in your order confirmation email
            </p>
            <p className="text-sm text-gray-500">
              Format: TRK-YYYYMMDD-XXXXXXXX
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;