import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/apiSlice';
import { User, Mail, Lock, UserPlus, ArrowLeft, AlertCircle, ShoppingBag, BadgeCheck, Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    age: '',
    about: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await signup(formData).unwrap();
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.data?.message || err.error || 'Signup failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Visual side - Registration Benefits */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-gray-900 to-indigo-900 opacity-90" />
        <div className="relative h-full flex flex-col justify-center px-16 space-y-12 z-10">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center rotate-3">
              <ShoppingBag className="text-white w-7 h-7" />
            </div>
            {/* <span className="text-2xl font-black text-white tracking-tight">Antigravity</span> */}
          </Link>

          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">Join our global shopping community</h2>
            <p className="text-xl text-gray-400 font-medium">Create an account and start discovering amazing products today.</p>
          </div>

          <div className="space-y-6 pt-10">
            {[
              { icon: BadgeCheck, title: 'Exclusive Discounts', desc: 'Get access to members-only pricing and seasonal sales.' },
              { icon: BadgeCheck, title: 'Priority Shipping', desc: 'Enjoy faster handling and shipping on every single order.' },
              { icon: BadgeCheck, title: 'Personalized Feed', desc: 'Our AI curates products based on your style and preferences.' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start space-x-4 bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: `${i * 150}ms` }}>
                <benefit.icon className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg">{benefit.title}</h4>
                  <p className="text-gray-400 font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 py-12 relative overflow-y-auto">
        <div className="absolute top-10 right-10 hidden sm:block">
           <Link to="/login" className="px-6 py-3 bg-gray-50 text-gray-900 text-sm font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-95">
            Log In
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
           <div className="sm:hidden flex items-center mb-8">
              <Link to="/login" className="text-indigo-600 font-black flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Sign In Instead</span>
              </Link>
           </div>
          
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium italic">Join us for a better shopping experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Age</label>
                <input
                  name="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">About (Optional)</label>
              <textarea
                name="about"
                rows="3"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium resize-none"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-600 rounded-2xl">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 font-medium text-sm">
            By clicking "Create Account", you agree to our{' '}
            <a href="#" className="font-bold text-gray-900 hover:underline">Terms</a> and{' '}
            <a href="#" className="font-bold text-gray-900 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
