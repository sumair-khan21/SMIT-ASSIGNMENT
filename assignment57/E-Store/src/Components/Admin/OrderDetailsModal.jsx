import React, { useState, useEffect } from 'react';
import { useAdminOrder, adminOrderOperations } from '../../hooks/useAdminOrders';
import { X, Package, DollarSign, MapPin, Calendar, Truck } from 'lucide-react';
import { sendOrderShippedEmail } from '../../services/emailServiceResend';

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdate }) => {
  const { order: fullOrder, orderItems, loading } = useAdminOrder(order?.id);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState({
    status: false,
    payment: false,
    tracking: false,
  });

  const [formData, setFormData] = useState({
    status: '',
    payment_status: '',
    tracking_number: '',
  });

  useEffect(() => {
    if (fullOrder) {
      setFormData({
        status: fullOrder.status || '',
        payment_status: fullOrder.payment_status || '',
        tracking_number: fullOrder.tracking_number || '',
      });
    }
  }, [fullOrder]);

  const handleUpdate = async (field, value) => {
  setUpdating(true);
  let result;

  if (field === 'status') {
    result = await adminOrderOperations.updateStatus(order.id, value);
    
    // ✨ Send email when order is shipped
    if (result.success && value === 'shipped') {
      const emailResult = await sendOrderShippedEmail({
        ...fullOrder,
        status: value
      });
      
      if (emailResult.success) {
        alert('✅ Order updated and shipping notification sent!');
      } else {
        alert('✅ Order updated successfully!');
      }
    }
  } else if (field === 'payment_status') {
    result = await adminOrderOperations.updatePaymentStatus(order.id, value);
  } else if (field === 'tracking_number') {
    result = await adminOrderOperations.updateTracking(order.id, value);
  }

  if (result.success && field !== 'status') {
    alert('✅ Order updated successfully!');
    setEditMode({ status: false, payment: false, tracking: false });
    onUpdate && onUpdate();
  }

  setUpdating(false);
};

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <p className="text-white/80 text-sm">{fullOrder?.order_number || order.order_number}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{fullOrder?.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{fullOrder?.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{fullOrder?.customer_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(fullOrder?.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h3>
                <p className="text-gray-700">
                  {fullOrder?.shipping_address}<br />
                  {fullOrder?.shipping_city}, {fullOrder?.shipping_state} {fullOrder?.shipping_zip}<br />
                  {fullOrder?.shipping_country}
                </p>
              </div>

              {/* Order Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Order Status */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Order Status</p>
                  {editMode.status ? (
                    <div className="space-y-2">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate('status', formData.status)}
                          disabled={updating}
                          className="flex-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode({ ...editMode, status: false })}
                          className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 capitalize">{fullOrder?.status}</span>
                      <button
                        onClick={() => setEditMode({ ...editMode, status: true })}
                        className="text-xs text-purple-600 hover:text-purple-800"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Payment Status */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                  {editMode.payment ? (
                    <div className="space-y-2">
                      <select
                        value={formData.payment_status}
                        onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate('payment_status', formData.payment_status)}
                          disabled={updating}
                          className="flex-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode({ ...editMode, payment: false })}
                          className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 capitalize">{fullOrder?.payment_status}</span>
                      <button
                        onClick={() => setEditMode({ ...editMode, payment: true })}
                        className="text-xs text-purple-600 hover:text-purple-800"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Tracking Number */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Tracking Number</p>
                  {editMode.tracking ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.tracking_number}
                        onChange={(e) => setFormData({ ...formData, tracking_number: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Enter tracking #"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate('tracking_number', formData.tracking_number)}
                          disabled={updating}
                          className="flex-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode({ ...editMode, tracking: false })}
                          className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{fullOrder?.tracking_number || 'N/A'}</span>
                      <button
                        onClick={() => setEditMode({ ...editMode, tracking: true })}
                        className="text-xs text-purple-600 hover:text-purple-800"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>


              {/* ✨ ADD: Carrier and Tracking URL */}
<div className="md:col-span-2">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Carrier */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Carrier
      </label>
      <input
        type="text"
        value={fullOrder?.carrier || ''}
        onChange={(e) => {
          // Update carrier in real-time
          adminOrderOperations.update(order.id, { carrier: e.target.value });
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="e.g., FedEx, UPS, USPS"
      />
    </div>

    {/* Tracking URL */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Carrier Tracking URL
      </label>
      <input
        type="url"
        value={fullOrder?.tracking_url || ''}
        onChange={(e) => {
          adminOrderOperations.update(order.id, { tracking_url: e.target.value });
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="https://..."
      />
    </div>
  </div>
</div>

{/* ✨ ADD: Public Tracking Link */}
{fullOrder?.tracking_number && (
  <div className="md:col-span-2">
    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
      <p className="text-sm font-semibold text-indigo-900 mb-2">
        📦 Public Tracking Link:
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={`${window.location.origin}/track/${fullOrder.tracking_number}`}
          readOnly
          className="flex-1 px-3 py-2 bg-white border border-indigo-300 rounded-lg text-sm"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/track/${fullOrder.tracking_number}`);
            alert('✅ Tracking link copied!');
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
)}

              {/* Order Items - ✅ FIXED */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                {orderItems && orderItems.length > 0 ? (
                  <div className="space-y-3">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-12 h-12 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{item.product_name}</p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ${item.unit_price}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-green-600">${item.total_price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No items in this order</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${fullOrder?.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${fullOrder?.shipping_cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${fullOrder?.tax}</span>
                  </div>
                  {fullOrder?.discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount</span>
                      <span className="font-semibold">-${fullOrder?.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t-2 border-gray-300 pt-2">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-green-600">${fullOrder?.total_amount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;