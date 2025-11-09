import React, { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, BarChart3, PieChart } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const { analytics, loading } = useAnalytics(timeRange);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Advanced Analytics
        </h2>
        <div className="flex space-x-2">
          {['7days', '30days', '90days'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Growth */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue Growth</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics.revenueGrowth > 0 ? '+' : ''}{analytics.revenueGrowth.toFixed(1)}%
              </p>
            </div>
            {analytics.revenueGrowth >= 0 ? (
              <TrendingUp className="w-12 h-12 text-green-500" />
            ) : (
              <TrendingDown className="w-12 h-12 text-red-500" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">vs previous period</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${analytics.averageOrderValue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">per transaction</p>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics.conversionRate.toFixed(1)}%
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">visitors to customers</p>
        </div>

        {/* Customer Retention */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Customer Retention</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics.customerRetention}%
              </p>
            </div>
            <Users className="w-12 h-12 text-pink-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">repeat customers</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Day Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Daily Sales</h3>
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="space-y-2">
            {analytics.salesByDay.map((day, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-xs text-gray-600 w-16">{day.date}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-2"
                    style={{
                      width: `${(day.sales / Math.max(...analytics.salesByDay.map(d => d.sales))) * 100}%`
                    }}
                  >
                    <span className="text-xs text-white font-semibold">
                      ${day.sales.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Sales by Category</h3>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            {analytics.salesByCategory.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded ${
                      index === 0 ? 'bg-indigo-500' :
                      index === 1 ? 'bg-purple-500' :
                      index === 2 ? 'bg-pink-500' : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                </div>
                <span className="text-sm font-bold text-green-600">
                  ${cat.sales.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Customers</h3>
          <div className="space-y-3">
            {analytics.topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${customer.totalSpent.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{customer.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {analytics.topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} units sold</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">${product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;