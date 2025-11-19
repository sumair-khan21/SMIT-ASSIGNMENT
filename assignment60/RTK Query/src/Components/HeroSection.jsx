import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 lg:py-28">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-teal-100">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">Now Live - New Collection</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-gray-900">Discover Your</span>
              <span className="block bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Perfect Style
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore our curated collection of premium products. From fashion to electronics, 
              find everything you need with unbeatable quality and prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-teal-100 hover:border-teal-300 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  5K+
                </div>
                <div className="text-sm text-gray-600 font-medium">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-600 font-medium">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:block animate-in slide-in-from-right duration-700">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-3xl p-8 backdrop-blur-sm border border-white/40 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* Product Cards */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl h-32 mb-3 flex items-center justify-center">
                      <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6">
                    <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl h-32 mb-3 flex items-center justify-center">
                      <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl h-32 mb-3 flex items-center justify-center">
                      <svg className="w-16 h-16 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6">
                    <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl h-32 mb-3 flex items-center justify-center">
                      <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-teal-100 animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Top Rated</div>
                    <div className="text-xs text-gray-600">Premium Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
