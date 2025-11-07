import React from 'react';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Heart,
  Target,
  Eye,
  Zap,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: Users, color: 'from-indigo-500 to-purple-500' },
    { number: '500+', label: 'Products', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { number: '98%', label: 'Satisfaction', icon: Heart, color: 'from-pink-500 to-indigo-500' },
    { number: '24/7', label: 'Support', icon: ShieldCheck, color: 'from-indigo-500 to-purple-500' }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Quality First',
      description: 'We ensure every product meets our high standards before reaching you.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Heart,
      title: 'Customer Love',
      description: 'Your satisfaction is our top priority. We go above and beyond for you.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your products to you on time.',
      gradient: 'from-pink-500 to-indigo-500'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing without compromising on quality or service.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Fashion enthusiast with 15+ years experience'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Creative director bringing trends to life'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Success',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Dedicated to your shopping experience'
    },
    {
      name: 'David Park',
      role: 'Operations Manager',
      image: 'https://randomuser.me/api/portraits/men/61.jpg',
      bio: 'Ensuring smooth delivery and logistics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">About PricePanda</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              We're on a mission to revolutionize online shopping by providing premium quality products 
              at unbeatable prices with exceptional customer service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-xl p-6 text-center border border-indigo-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                To make premium fashion accessible to everyone by offering carefully curated products 
                that combine quality, style, and affordability. We believe that looking good shouldn't 
                break the bank.
              </p>
              <ul className="space-y-2">
                {['Quality Products', 'Affordable Prices', 'Fast Shipping', 'Great Service'].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-indigo-100 leading-relaxed mb-4">
                To become the world's most trusted online fashion destination, known for our 
                commitment to quality, customer satisfaction, and sustainable practices. We envision 
                a future where everyone can express their style confidently.
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur rounded-lg">
                <p className="text-sm italic">
                  "Fashion is about expressing who you are, and we're here to help you do just that."
                </p>
                <p className="text-xs mt-2">- Sarah Johnson, CEO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at PricePanda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to your shopping experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing products at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;