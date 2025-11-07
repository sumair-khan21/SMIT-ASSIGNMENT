// import React from 'react';
// import { Search } from 'lucide-react';

// const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
//   return (
//     <div className="relative flex-1">
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
//     </div>
//   );
// };

// export default SearchBar;





import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search products...", onClear }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className="relative flex-1 group">
      {/* Gradient border on focus */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
        ${isFocused ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-300 -z-10 blur-sm
      `} />
      
      {/* Search Icon with animation */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Search className={`
          w-5 h-5 transition-all duration-300
          ${isFocused ? 'text-indigo-600 scale-110' : 'text-gray-400'}
        `} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full py-3 px-10 pr-12
          border-2 rounded-xl
          transition-all duration-300
          ${isFocused 
            ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
            : 'border-indigo-200 hover:border-indigo-300'
          }
          focus:outline-none
          placeholder:text-gray-400
          bg-white
        `}
        style={{
          background: isFocused 
            ? 'linear-gradient(to right, rgba(99, 102, 241, 0.02), rgba(168, 85, 247, 0.02))' 
            : 'white'
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
        >
          <X className="w-4 h-4 text-gray-500 hover:text-indigo-600" />
        </button>
      )}

      {/* Sparkle animation on focus */}
      {isFocused && (
        <Sparkles className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-500 animate-pulse" />
      )}
    </div>
  );
};

export default SearchBar;