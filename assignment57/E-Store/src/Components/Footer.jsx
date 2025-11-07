import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ChevronRight,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Clock,
  ArrowUp,
  Gem,
  CheckCircle,
  ExternalLink,
  Globe,
  MessageCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show/hide scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Footer data
  const footerSections = {
    quickLinks: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Products', path: '/products' },
      { name: 'New Arrivals', path: '/products' },
      { name: 'Best Sellers', path: '/products' },
      { name: 'Special Offers', path: '/products' }
    ],
    customerService: [
      { name: 'FAQ', path: '/faq', icon: MessageCircle },
      { name: 'Shipping Information', path: '/shipping', icon: Truck },
      { name: 'Returns & Exchanges', path: '/returns', icon: ChevronRight },
      { name: 'Size Guide', path: '/size-guide', icon: ChevronRight },
      { name: 'Track Order', path: '/track-order', icon: ChevronRight },
      { name: 'Gift Cards', path: '/gift-cards', icon: ChevronRight }
    ],
    policies: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Disclaimer', path: '/disclaimer' },
      { name: 'Accessibility', path: '/accessibility' },
      { name: 'Sitemap', path: '/sitemap' }
    ],
    categories: [
      { name: "Men's Clothing", path: '/products?category=mens' },
      { name: "Women's Clothing", path: '/products?category=womens' },
      { name: 'Accessories', path: '/products?category=accessories' },
      { name: 'New Collection', path: '/products?new=true' },
      { name: 'Sale Items', path: '/products?sale=true' },
      { name: 'Premium Range', path: '/products?premium=true' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-600' }
  ];

  const trustBadges = [
    { icon: Shield, text: 'Secure Shopping' },
    { icon: Truck, text: 'Fast Delivery' },
    { icon: CreditCard, text: 'Safe Payment' },
    { icon: Clock, text: '24/7 Support' }
  ];

  const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Amex'];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white relative">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-8 md:h-12"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#footerGradient)"
            d="M0,30 C120,20 240,40 360,30 C480,20 600,40 720,30 C840,20 960,40 1080,30 C1200,20 1320,40 1440,30 L1440,0 L0,0 Z"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(99, 102, 241)', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-indigo-400" />
                  <span>Subscribe to Our Newsletter</span>
                </h3>
                <p className="text-gray-300">
                  Get exclusive offers, new product updates, and style tips delivered to your inbox!
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">PricePanda</span>
            </Link>
            <p className="text-gray-300 mb-6 text-sm">
              Your trusted destination for premium fashion at unbeatable prices. Quality, style, and satisfaction guaranteed.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">123 Fashion Street</p>
                  <p className="text-sm text-gray-300">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <a href="tel:+15551234567" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <a href="mailto:support@pricepanda.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  support@pricepanda.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerSections.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Customer Service</h4>
            <ul className="space-y-2">
              {footerSections.customerService.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Shop Categories</h4>
            <ul className="space-y-2">
              {footerSections.categories.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              {footerSections.policies.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-gray-300">
                <badge.icon className="w-5 h-5 text-indigo-400" />
                <span className="text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-gray-400">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-gray-400">Accepted Payments</h5>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-white/10 rounded-lg text-xs text-gray-300 border border-white/10"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2025 PricePanda. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                {/* <Heart className="w-4 h-4 text-red-500 fill-red-500" /> */}
                <span>by PricePanda Team</span>
              </span>
            </div>
            
            {/* Language/Currency Selector */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;