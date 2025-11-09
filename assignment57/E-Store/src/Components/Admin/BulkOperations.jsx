import React, { useState } from 'react';
import { Trash2, Edit, Download, CheckSquare, Square } from 'lucide-react';

const BulkOperations = ({ 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkEdit,
  onExport,
  totalItems 
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  if (selectedItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={selectedItems.length === totalItems ? onDeselectAll : onSelectAll}
          className="flex items-center space-x-2 hover:bg-white/20 px-3 py-1 rounded transition"
        >
          {selectedItems.length === totalItems ? <CheckSquare /> : <Square />}
          <span>{selectedItems.length} selected</span>
        </button>
        
        <span className="text-white/80">|</span>
        
        <button
          onClick={onBulkDelete}
          className="flex items-center space-x-2 hover:bg-red-600 px-3 py-1 rounded transition"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>

        <button
          onClick={onBulkEdit}
          className="flex items-center space-x-2 hover:bg-white/20 px-3 py-1 rounded transition"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center space-x-2 hover:bg-white/20 px-3 py-1 rounded transition"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      <button
        onClick={onDeselectAll}
        className="hover:bg-white/20 px-3 py-1 rounded transition"
      >
        Clear Selection
      </button>
    </div>
  );
};

export default BulkOperations;