import React, { useState } from 'react';
import { migrateProductsFromFakeAPI } from '../scripts/migrateProducts';

const MigrationTool = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleMigration = async () => {
    setLoading(true);
    setStatus(' Starting migration... Please wait...');
    setResult(null);

    const migrationResult = await migrateProductsFromFakeAPI();

    if (migrationResult.success) {
      setStatus(` ${migrationResult.message}`);
      setResult(migrationResult);
    } else {
      setStatus(` ${migrationResult.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border-2 border-indigo-100">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Product Migration Tool
          </h2>
          <p className="text-gray-600">
            PricePanda Database Setup
          </p>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-100">
          <p className="text-sm text-gray-700">
            This tool will migrate <strong>clothing products only</strong> (Men's & Women's) from Fake Store API to your Supabase <strong>pandaproducts</strong> table.
          </p>
        </div>

        {/* Migration Button */}
        <button
          onClick={handleMigration}
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Migrating Products...
            </span>
          ) : (
            '🚀 Start Migration'
          )}
        </button>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            status.includes('✅') 
              ? 'bg-green-50 border-green-300' 
              : status.includes('❌')
              ? 'bg-red-50 border-red-300'
              : 'bg-blue-50 border-blue-300'
          }`}>
            <p className={`text-sm font-medium ${
              status.includes('✅') 
                ? 'text-green-800' 
                : status.includes('❌')
                ? 'text-red-800'
                : 'text-blue-800'
            }`}>
              {status}
            </p>
            
            {result && result.success && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-green-700">
                  ✓ Total products migrated: <strong>{result.count}</strong><br />
                  ✓ Check your Supabase Table Editor to see them!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Warning Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-yellow-800 mb-1">
                ⚠️ IMPORTANT:
              </p>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Run this migration <strong>only ONCE</strong></li>
                <li>• After successful migration, remove this route from your app</li>
                <li>• Check browser console for detailed logs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>After successful migration:</strong><br />
            1. Go to Supabase Dashboard → Table Editor<br />
            2. Click on "pandaproducts" table<br />
            3. Verify your clothing products are there<br />
            4. Remove the /migrate route from App.jsx
          </p>
        </div>
      </div>
    </div>
  );
};

export default MigrationTool;