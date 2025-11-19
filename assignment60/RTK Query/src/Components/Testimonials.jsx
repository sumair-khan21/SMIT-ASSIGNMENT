import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review: "Absolutely love my purchase! The quality exceeded my expectations and delivery was super fast. Will definitely shop here again!",
      product: "Electronics"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      review: "Best online shopping experience I've had. Great products, amazing customer service, and the checkout process was seamless.",
      product: "Men's Clothing"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      review: "Really impressed with the product quality and packaging. The only thing is shipping took a bit longer than expected, but worth the wait!",
      product: "Jewelery"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "VIP Customer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review: "I've been shopping here for months now. Consistent quality, great prices, and excellent customer support. Highly recommended!",
      product: "Electronics"
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      review: "The product arrived exactly as described. Love the attention to detail and the eco-friendly packaging. Five stars all the way!",
      product: "Women's Clothing"
    },
    {
      id: 6,
      name: "James Anderson",
      role: "Regular Customer",
      image: "https://i.pravatar.cc/150?img=14",
      rating: 5,
      review: "Top-notch service! Had a question about my order and the support team responded within minutes. The product is fantastic too!",
      product: "Electronics"
    }
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full mb-6">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-teal-700">Customer Reviews</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-200 fill-current'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.review}"
              </p>

              {/* Product Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {testimonial.product}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-4xl font-black mb-1">4.9</div>
              <div className="text-white/90 text-sm font-medium">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">10K+</div>
              <div className="text-white/90 text-sm font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">15K+</div>
              <div className="text-white/90 text-sm font-medium">Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">98%</div>
              <div className="text-white/90 text-sm font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
