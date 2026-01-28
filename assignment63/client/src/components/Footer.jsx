import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Package className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                 Shop
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Redefining your digital shopping experience with style, quality, and lightning-fast delivery. Your dreams, our mission.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Categories</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Sales & Offers</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Customer Support</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Track Your Order</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>123 Tech Avenue, Digital City, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-500" />
                <span>support@antigravity-shop.com</span>
              </li>
            </ul>
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-gray-800 border-none rounded-l-xl px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-700 transition-colors font-bold text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>© 2026 Antigravity Shop. All rights reserved by Sumair.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
