import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-in zoom-in duration-500">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-in fade-in duration-700">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in duration-700" style={{ animationDelay: '100ms' }}>
          Get exclusive deals, new arrivals, and insider updates delivered straight to your inbox!
        </p>

        {/* Newsletter Form */}
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-in slide-in-from-bottom duration-700"
          style={{ animationDelay: '200ms' }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-6 py-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Subscribe
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mt-6 inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl shadow-lg animate-in zoom-in duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Thanks for subscribing!</span>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <p className="font-semibold">Exclusive Deals</p>
            <p className="text-sm text-white/80">Get first access to sales</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="font-semibold">New Arrivals</p>
            <p className="text-sm text-white/80">Be the first to know</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold">Special Offers</p>
            <p className="text-sm text-white/80">Members-only discounts</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
