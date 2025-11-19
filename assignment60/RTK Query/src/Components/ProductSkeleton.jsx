import React from 'react'

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative bg-gray-200 aspect-square"></div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Price */}
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>

        {/* Button */}
        <div className="h-11 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  )
}

export default ProductSkeleton
