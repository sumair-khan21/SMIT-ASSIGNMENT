import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useDarkMode } from '../Context/DarkModeContext'; // ✨ ADD
import { Package, ShoppingBag, FolderOpen, TrendingUp, Users, DollarSign, ArrowLeft, Sparkles, Plus, Search, Download, BarChart3, Bell } from 'lucide-react';
import ProductsTable from '../Components/Admin/ProductsTable';
import AddProductModal from '../Components/Admin/AddProductModal';
import EditProductModal from '../Components/Admin/EditProductModal';
import OrdersTable from '../Components/Admin/OrdersTable';
import CategoriesTable from '../Components/Admin/CategoriesTable';
import AnalyticsDashboard from '../Components/Admin/AnalyticsDashboard';
import UserManagement from '../Components/Admin/UserManagement';
import InventoryAlerts from '../Components/Admin/InventoryAlerts';
import SalesReports from '../Components/Admin/SalesReports';
import NotificationCenter from '../Components/Admin/NotificationCenter';
import DarkModeToggle from '../Components/Admin/DarkModeToggle'; // ✨ ADD
import { useDashboardStats } from '../hooks/useDashboardStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode(); // ✨ ADD
  const { stats, loading: statsLoading } = useDashboardStats();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'categories', name: 'Categories', icon: FolderOpen },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'inventory', name: 'Inventory', icon: Bell },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
  ];

  const statCards = [
    {
      name: 'Total Products',
      value: statsLoading ? '...' : stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'from-indigo-500 to-purple-600',
      change: '+12%'
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

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header - Mobile Responsive with Dark Mode */}
      <div className={`shadow-2xl transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 sm:py-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-pulse" />
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-1 hidden sm:flex items-center space-x-2">
                    <span>👋 Welcome back,</span>
                    <span className="font-semibold">{user?.email}</span>
                  </p>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="sm:hidden flex items-center space-x-2">
                <DarkModeToggle />
                <NotificationCenter />
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center space-x-3">
                <DarkModeToggle />
                <NotificationCenter />
              </div>

              <button
                onClick={() => navigate('/')}
                className={`group px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-indigo-600'
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Store</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Mobile Responsive with Dark Mode */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`bg-gradient-to-r ${stat.color} p-4 sm:p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white/80 text-xs sm:text-sm font-medium truncate">{stat.name}</p>
                    <p className="text-xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 sm:w-12 sm:h-12 text-white/30 ml-2" />
                </div>
              </div>
              <div className={`p-2 sm:p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-semibold">{stat.change}</span>
                  <span className={`ml-1 hidden sm:inline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>vs last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Navigation - Mobile Responsive with Dark Mode */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`rounded-t-xl shadow-lg overflow-x-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <nav className="flex space-x-1 p-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content with Dark Mode */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className={`rounded-b-xl shadow-2xl p-4 sm:p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                  Dashboard Overview
                </h2>
                <button
                  onClick={() => exportToCSV(stats.recentOrders, 'recent_orders')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`rounded-xl p-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                    : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                }`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Order Status Distribution
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className={`text-sm font-medium capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {status}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-32 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${(count / stats.totalOrders) * 100}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-xl p-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                    : 'bg-gradient-to-br from-purple-50 to-pink-50'
                }`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Revenue Trend
                  </h3>
                  <div className="space-y-2">
                    {stats.revenueByMonth.map((item) => (
                      <div key={item.month} className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.month}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          ${item.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className={`border-2 rounded-xl p-6 overflow-x-auto ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Orders
                </h3>
                <div className="min-w-[600px]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-bold uppercase ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Order</th>
                        <th className={`px-4 py-2 text-left text-xs font-bold uppercase ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Customer</th>
                        <th className={`px-4 py-2 text-left text-xs font-bold uppercase ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Amount</th>
                        <th className={`px-4 py-2 text-left text-xs font-bold uppercase ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className={`px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {order.order_number}
                          </td>
                          <td className={`px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {order.customer_name}
                          </td>
                          <td className="px-4 py-2 text-sm font-bold text-green-600">
                            ${order.total_amount}
                          </td>
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
              <div className={`border-2 rounded-xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Top Rated Products
                </h3>
                <div className="space-y-3">
                  {stats.topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.title}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Stock: {product.stock} | Price: ${product.price}
                        </p>
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Product Management
                  </h2>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your store products
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-full sm:w-80 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                searchTerm={searchTerm}
              />
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && <OrdersTable />}

          {/* Categories Tab */}
          {activeTab === 'categories' && <CategoriesTable />}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {/* Customers Tab */}
          {activeTab === 'customers' && <UserManagement />}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && <InventoryAlerts />}

          {/* Reports Tab */}
          {activeTab === 'reports' && <SalesReports />}
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