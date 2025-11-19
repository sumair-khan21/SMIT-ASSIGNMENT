import React from 'react'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Free Shipping",
      description: "Free delivery on orders over $50. Get your products delivered to your doorstep.",
      bgColor: "from-teal-500 to-emerald-500"
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Secure Payment",
      description: "100% secure payment processing. Your financial information is always protected.",
      bgColor: "from-emerald-500 to-cyan-500"
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Easy Returns",
      description: "30-day hassle-free returns. Not satisfied? Return it within 30 days for a full refund.",
      bgColor: "from-cyan-500 to-teal-500"
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock customer support. We're here to help you anytime, anywhere.",
      bgColor: "from-teal-500 to-cyan-500"
    }
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best shopping experience with premium quality products and exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgColor} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-white mb-2">10K+</div>
              <div className="text-white/90 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-white mb-2">5K+</div>
              <div className="text-white/90 font-medium">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-white mb-2">4.9</div>
              <div className="text-white/90 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-white mb-2">24/7</div>
              <div className="text-white/90 font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
