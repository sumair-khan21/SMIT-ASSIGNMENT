import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [scrollY, setScrollY] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  return (
    <nav 
      className="fixed top-0 w-full z-50 backdrop-blur-md text-white py-3 transition-all duration-300"
      style={{
        transform: scrollY > 100 ? `translateY(-${Math.min(scrollY - 100, 100)}px)` : 'translateY(0)',
        backgroundColor: `rgba(5, 5, 5, ${Math.min(scrollY / 200, 0.9)})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/sums.png" alt="logo" className="w-9 h-11" />
          <span className="ml-3 text-sm">Sumair <br />Coding School</span>
        </Link>

        {/* Navbar Links */}
        <ul className="flex space-x-10 text-base font-light tracking-wide">
          <li>
            <Link to="/" className="text-gray-300 hover:text-[#3ef0c9] transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-[#3ef0c9] transition duration-300">
              About
            </Link>
          </li>
          <li>
             <Link to="/course" className="text-[#8B4513] hover:text-[#A0522D] transition duration-300 animate-move-horizontal font-bold" >
              Courses
            </Link>
          </li>
          
          <li>
            <Link to="/contect" className="text-gray-300 hover:text-[#3ef0c9] transition duration-300">
              Request Callback
            </Link>
          </li>
        </ul>
 
        {/* Login Button */}
        {/* <Link 
          to="/login" 
          className="bg-[#3ef0c9] text-black px-6 py-1.5 rounded-md font-medium hover:bg-[#2ed4af] transition duration-300"
        >
          Login
        </Link> */}

        <button onClick={()=> setOpenLogin(true)} className="bg-[#3ef0c9] text-black px-6 py-1.5 rounded-md font-medium hover:bg-[#2ed4af] transition duration-300">
              Login
        </button>
        <Login setOpen={setOpenLogin} open={openLogin}/>
      </div>
      <style>{`
        @keyframes move-horizontal {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

.animate-move-horizontal {
  animation: move-horizontal 2s ease-in-out infinite;
}
      `}</style>
    </nav>
  );
};

export default Navbar;

