import React, { useState } from 'react';
import { useInventoryAlerts } from '../../hooks/useInventoryAlerts';
import { AlertTriangle, Package, TrendingDown, RefreshCw, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InventoryAlerts = () => {
  const [threshold, setThreshold] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const { alerts, loading } = useInventoryAlerts(threshold);
  const navigate = useNavigate();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Inventory Alerts
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor low stock items and prevent stockouts
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Settings</h3>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Alert Threshold (units):
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value) || 10)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 w-24"
              min="1"
              max="100"
            />
            <p className="text-sm text-gray-600">
              Alert when stock falls below this number
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {alerts.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Out of stock items</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">High Priority</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {alerts.filter(a => a.severity === 'high').length}
              </p>
            </div>
            <TrendingDown className="w-12 h-12 text-orange-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">≤ 5 units remaining</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Medium Priority</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {alerts.filter(a => a.severity === 'medium').length}
              </p>
            </div>
            <Package className="w-12 h-12 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">≤ {threshold} units remaining</p>
        </div>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">All inventory levels are healthy!</p>
          <p className="text-gray-500 mt-2">No low stock alerts at this time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${getSeverityColor(alert.severity)} hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Product Image */}
                  {alert.image ? (
                    <img
                      src={alert.image}
                      alt={alert.title}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-gray-900">{alert.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">Category: {alert.category}</span>
                      <span className="text-xs text-gray-500">Price: ${alert.price}</span>
                      <span className="text-xs text-gray-500">ID: {alert.id}</span>
                    </div>
                  </div>
                </div>

                {/* Stock Display */}
                <div className="text-right ml-4">
                  <div className={`text-4xl font-bold ${
                    alert.severity === 'critical' ? 'text-red-600' :
                    alert.severity === 'high' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {alert.stock}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">units left</p>
                  <button
                    onClick={() => navigate('/admin')}
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Restock Now
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-500' :
                      alert.severity === 'high' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((alert.stock / threshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;