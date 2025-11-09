import React, { useState } from 'react';
import { useSalesReports } from '../../hooks/useSalesReports';
import { Download, TrendingUp, ShoppingCart, DollarSign, Package, Calendar, BarChart3, PieChart } from 'lucide-react';

const SalesReports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState('30days');
  const { report, loading } = useSalesReports(reportType);

  // Export report to CSV
  const exportReport = () => {
    const csvData = report.salesData.map(item => ({
      'Period': item.period,
      'Sales': `$${item.sales.toFixed(2)}`,
      'Orders': item.orders
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Export detailed report
  const exportDetailedReport = () => {
    const data = {
      'Summary': report.summary,
      'Top Products': report.topProducts,
      'Top Categories': report.topCategories,
      'Payment Methods': report.paymentMethods,
      'Order Statuses': report.orderStatuses,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detailed_sales_report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Sales Reports
          </h2>
          <p className="text-gray-600 mt-1">Comprehensive sales analytics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportDetailedReport}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Detailed</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Report Type:</span>
        </div>
        {['daily', 'weekly', 'monthly'].map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
              reportType === type
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${report.summary.totalSales.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {report.summary.totalOrders}
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${report.summary.averageOrderValue.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Items Sold</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {report.summary.totalItems}
              </p>
            </div>
            <Package className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Sales Trend</h3>
          <BarChart3 className="w-5 h-5 text-green-600" />
        </div>
        <div className="space-y-3">
          {report.salesData.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-32">{item.period}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-between px-3"
                  style={{
                    width: `${(item.sales / Math.max(...report.salesData.map(d => d.sales))) * 100}%`
                  }}
                >
                  <span className="text-sm text-white font-semibold">
                    ${item.sales.toFixed(2)}
                  </span>
                  <span className="text-xs text-white">
                    {item.orders} orders
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {report.topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
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

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Sales by Category</h3>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            {report.topCategories.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-emerald-500' :
                      index === 2 ? 'bg-teal-500' : 'bg-gray-400'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{cat.category}</p>
                    <p className="text-xs text-gray-500">{cat.items} items</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">
                  ${cat.revenue.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {report.paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 capitalize">{method.method}</p>
                  <p className="text-xs text-gray-500">{method.count} transactions</p>
                </div>
                <p className="font-bold text-gray-900">${method.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Statuses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {report.orderStatuses.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">{status.status}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        status.status === 'delivered' ? 'bg-green-500' :
                        status.status === 'shipped' ? 'bg-blue-500' :
                        status.status === 'processing' ? 'bg-yellow-500' :
                        status.status === 'cancelled' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}
                      style={{
                        width: `${(status.count / report.summary.totalOrders) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-8 text-right">{status.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;