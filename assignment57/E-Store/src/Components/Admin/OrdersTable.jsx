import React, { useState } from 'react';
import { useAdminOrders, adminOrderOperations } from '../../hooks/useAdminOrders';
import { Eye, Trash2, Package, AlertCircle, ChevronLeft, ChevronRight, DollarSign, Search, Download } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersTable = () => {
  const { orders, loading, error, refetch } = useAdminOrders();
  const [deleteModal, setDeleteModal] = useState({ show: false, order: null });
  const [detailsModal, setDetailsModal] = useState({ show: false, order: null });
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // ✨ ADD search state
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // ✨ ADD: Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    const search = searchTerm.toLowerCase();
    return (
      order.order_number?.toLowerCase().includes(search) ||
      order.customer_name?.toLowerCase().includes(search) ||
      order.customer_email?.toLowerCase().includes(search) ||
      order.customer_phone?.toLowerCase().includes(search) ||
      order.status?.toLowerCase().includes(search) ||
      order.payment_status?.toLowerCase().includes(search) ||
      order.tracking_number?.toLowerCase().includes(search) ||
      order.id?.toString().includes(search)
    );
  });

  // ✨ UPDATE: Calculate Pagination based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // ✨ ADD: Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination Handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteModal.order) return;
    
    setDeleting(true);
    const result = await adminOrderOperations.delete(deleteModal.order.id);
    
    if (result.success) {
      alert('✅ Order deleted successfully!');
      setDeleteModal({ show: false, order: null });
      
      const newTotal = filteredOrders.length - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      refetch();
    } else {
      alert('❌ Failed to delete order: ' + result.error);
    }
    
    setDeleting(false);
  };

  // ✨ ADD: Export filtered orders to CSV
  const exportToCSV = () => {
    const csvData = filteredOrders.map(order => ({
      'Order Number': order.order_number,
      'Customer Name': order.customer_name,
      'Customer Email': order.customer_email,
      'Total Amount': order.total_amount,
      'Status': order.status,
      'Payment Status': order.payment_status,
      'Order Date': new Date(order.created_at).toLocaleDateString(),
      'Shipping Address': order.shipping_address,
      'Tracking Number': order.tracking_number || 'N/A'
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Get Status Badge Color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-medium">Error loading orders: {error}</p>
      </div>
    );
  }

  return (
    <>
      {/* ✨ ADD: Search Bar and Export Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order #, customer, email, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={filteredOrders.length === 0}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>Export {filteredOrders.length} Orders</span>
        </button>
      </div>

      {/* ✨ ADD: Search Results Info */}
      {searchTerm && (
        <div className="mb-4 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700">
            Found <span className="font-bold">{filteredOrders.length}</span> order(s) matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Empty State for search */}
      {filteredOrders.length === 0 ? (
        <div className="border-2 border-dashed border-purple-200 rounded-xl p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50">
          <Package className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">
            {searchTerm ? `No orders found matching "${searchTerm}"` : 'No orders found'}
          </p>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here when customers make purchases'}
          </p>
        </div>
      ) : (
        <>
          {/* Orders Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-purple-50/50 transition-colors">
                    {/* Order Number - ✨ Highlight search match */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600">
                        {searchTerm && order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                          <span className="bg-yellow-200 px-1 rounded">
                            {order.order_number}
                          </span>
                        ) : (
                          order.order_number
                        )}
                      </div>
                      <div className="text-xs text-gray-500">ID: {order.id}</div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.customer_name}
                      </div>
                      <div className="text-xs text-gray-500">{order.customer_email}</div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-bold text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {parseFloat(order.total_amount).toFixed(2)}
                      </div>
                    </td>

                    {/* Order Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setDetailsModal({ show: true, order })}
                          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ show: true, order })}
                          className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-purple-600">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-purple-600">{Math.min(endIndex, filteredOrders.length)}</span> of{' '}
                <span className="font-semibold text-purple-600">{filteredOrders.length}</span> 
                {searchTerm && ` filtered`} orders
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-110'
                            : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 border border-gray-300'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Order?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete order
              </p>
              <p className="font-semibold text-gray-900 mt-2">
                {deleteModal.order?.order_number}
              </p>
              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone!
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal({ show: false, order: null })}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={detailsModal.show}
        onClose={() => setDetailsModal({ show: false, order: null })}
        order={detailsModal.order}
        onUpdate={refetch}
      />
    </>
  );
};

export default OrdersTable;