import React, { useState } from 'react';
import { ChevronDown, Filter, Check } from 'lucide-react';

const FilterDropdown = ({ value, onChange, options = [], label, icon: Icon = Filter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {label}
        </label>
      )}
      
      {/* Custom Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          relative w-full min-w-[180px] py-3 px-4 pr-10
          border-2 rounded-xl
          transition-all duration-300
          ${isFocused || isOpen
            ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
            : 'border-indigo-200 hover:border-indigo-300'
          }
          bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
          text-left font-medium
          flex items-center justify-between
          group
        `}
      >
        {/* Icon and Value */}
        <div className="flex items-center space-x-2">
          <Icon className={`
            w-4 h-4 transition-colors duration-300
            ${value ? 'text-indigo-600' : 'text-gray-400'}
          `} />
          <span className={value ? 'text-gray-800' : 'text-gray-500'}>
            {value || 'All'}
          </span>
        </div>

        {/* Chevron Icon */}
        <ChevronDown className={`
          w-4 h-4 text-gray-400 transition-all duration-300
          ${isOpen ? 'rotate-180 text-indigo-600' : ''}
          group-hover:text-indigo-600
        `} />

        {/* Active indicator */}
        {value && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transform translate-x-1 -translate-y-1" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-slideDown">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2">
            <p className="text-white text-xs font-medium">Select Option</p>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {/* All/Clear Option */}
            <button
              onClick={() => handleSelect('')}
              className={`
                w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
                transition-colors duration-200 flex items-center justify-between
                ${!value ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-700'}
              `}
            >
              <span>All</span>
              {!value && <Check className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Options */}
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
                  transition-colors duration-200 flex items-center justify-between
                  border-t border-gray-100
                  ${value === option ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-700'}
                `}
              >
                <span>{option}</span>
                {value === option && <Check className="w-4 h-4 text-indigo-600" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Animation Style */}
      <style jsx>{`
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FilterDropdown;