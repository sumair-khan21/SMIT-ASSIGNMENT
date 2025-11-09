import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Package, ShoppingBag, FolderOpen, TrendingUp, Users, DollarSign, ArrowLeft, Sparkles, Plus, Search, Download, BarChart3, TrendingDown } from 'lucide-react';
import ProductsTable from '../Components/Admin/ProductsTable';
import AddProductModal from '../Components/Admin/AddProductModal';
import EditProductModal from '../Components/Admin/EditProductModal';
import OrdersTable from '../Components/Admin/OrdersTable';
import CategoriesTable from '../Components/Admin/CategoriesTable';
import { useDashboardStats } from '../hooks/useDashboardStats'; // ✨ ADD

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // ✨ CHANGE: default to dashboard
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useDashboardStats(); // ✨ ADD

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // ✨ ADD

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 }, // ✨ ADD
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'categories', name: 'Categories', icon: FolderOpen },
  ];

  // ✨ UPDATED: Dynamic stats
  const statCards = [
    { 
      name: 'Total Products', 
      value: statsLoading ? '...' : stats.totalProducts.toLocaleString(), 
      icon: Package, 
      color: 'from-indigo-500 to-purple-600',
      change: '+12%' // You can calculate real change if needed
    },
    { 
      name: 'Total Orders', 
      value: statsLoading ? '...' : stats.totalOrders.toLocaleString(), 
      icon: ShoppingBag, 
      color: 'from-purple-500 to-pink-600',
      change: '+8%'
    },
    { 
      name: 'Revenue', 
      value: statsLoading ? '...' : `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      icon: DollarSign, 
      color: 'from-pink-500 to-indigo-600',
      change: '+23%'
    },
    { 
      name: 'Customers', 
      value: statsLoading ? '...' : stats.totalCustomers.toLocaleString(), 
      icon: Users, 
      color: 'from-indigo-600 to-purple-500',
      change: '+5%'
    },
  ];

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleModalSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  // ✨ ADD: Export function
  const exportToCSV = (data, filename) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                <h1 className="text-4xl font-bold text-white">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-indigo-100 mt-2 flex items-center space-x-2">
                <span>👋 Welcome back,</span>
                <span className="font-semibold">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="group px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Store</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.name}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className="w-12 h-12 text-white/30" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white p-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-semibold">{stat.change}</span>
                  <span className="ml-1">vs last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-t-xl shadow-lg">
          <nav className="flex space-x-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-b-xl shadow-2xl p-8">
          
          {/* ✨ NEW: Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Overview
                </h2>
                <button
                  onClick={() => exportToCSV(stats.recentOrders, 'recent_orders')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Status Chart */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status Distribution</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${(count / stats.totalOrders) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Trend */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
                  <div className="space-y-2">
                    {stats.revenueByMonth.map((item) => (
                      <div key={item.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.month}</span>
                        <span className="text-sm font-bold text-green-600">
                          ${item.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Order</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Customer</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{order.order_number}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{order.customer_name}</td>
                          <td className="px-4 py-2 text-sm font-bold text-green-600">${order.total_amount}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Rated Products</h3>
                <div className="space-y-3">
                  {stats.topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock} | Price: ${product.price}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-bold">{product.rating_rate || 'N/A'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Product Management
                  </h2>
                  <p className="text-gray-600 mt-1">Manage your store products</p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* ✨ ADD: Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
              
              <ProductsTable 
                key={refreshKey}
                onEdit={handleEditProduct} 
                onRefresh={handleModalSuccess}
                searchTerm={searchTerm} // ✨ Pass search term
              />
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Order Management
                  </h2>
                  <p className="text-gray-600 mt-1">Track and manage customer orders</p>
                </div>
                {/* ✨ ADD: Export Button */}
                <button
                  onClick={() => {
                    // Fetch and export orders
                    alert('Exporting orders to CSV...');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Orders</span>
                </button>
              </div>
              <OrdersTable />
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <CategoriesTable />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleModalSuccess}
      />

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleModalSuccess}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminDashboard;