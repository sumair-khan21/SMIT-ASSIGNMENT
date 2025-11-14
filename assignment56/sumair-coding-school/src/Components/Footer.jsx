import React from "react";
import { FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="h-screen w-full bg-gradient-to-b from-[#000000] to-[#021914] flex flex-col justify-between text-white font-poppins">
      <hr className="border-gray-700" />

      <div className="flex flex-wrap justify-around items-start px-10 py-16 gap-10 md:gap-0">
        
        {/* ==== Social Section ==== */}
        <div className="flex flex-col gap-3 max-w-xs">
          <img src="/sums.png" alt="Logo" className="w-16 h-auto" />
          <p className="text-gray-300 text-sm">Let's connect on social media</p>

          <ul className="flex gap-4 text-2xl mt-2">
            <li className="hover:text-[#00E5A0] transition">
              <Link to="/instagram">
                <FaInstagram />
              </Link>
            </li>
            <li className="hover:text-[#00E5A0] transition">
              <Link to="/linkedin">
                <FaLinkedin />
              </Link>
            </li>
            <li className="hover:text-[#00E5A0] transition">
              <Link to="/discord">
                <FaDiscord />
              </Link>
            </li>
            <li className="hover:text-[#00E5A0] transition">
              <Link to="/x">
                <FaSquareXTwitter />
              </Link>
            </li>
          </ul>
        </div>

        {/* ==== Company Section ==== */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#00E5A0] mb-2">COMPANY</h3>
          <Link to="/about" className="hover:text-[#00E5A0] transition">About Us</Link>
          <Link to="/support" className="hover:text-[#00E5A0] transition">Support</Link>
          <Link to="/privacy-policy" className="hover:text-[#00E5A0] transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#00E5A0] transition">Terms & Condition</Link>
          <Link to="/pricing" className="hover:text-[#00E5A0] transition">Pricing & Refund</Link>
          <Link to="/hire" className="hover:text-[#00E5A0] transition">Hire From Us</Link>
          <Link to="/submit-project" className="hover:text-[#00E5A0] transition">Submit Projects</Link>
        </div>

        {/* ==== Community Section ==== */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#00E5A0] mb-2">COMMUNITY</h3>
          <Link to="/discord" className="hover:text-[#00E5A0] transition">Discord</Link>
          <Link to="/whatsapp" className="hover:text-[#00E5A0] transition">WhatsApp</Link>
        </div>

        {/* ==== Contact Section ==== */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#00E5A0] mb-2">GET IN TOUCH</h3>

          <Link to="/contact" className="hover:text-[#00E5A0] transition">
            <span className="block text-gray-400">Online: 11am - 8pm</span>
            <span>0313-2857876</span>
          </Link>

          <Link to="/contact" className="hover:text-[#00E5A0] transition">
            <span className="block text-gray-400">Office: 11am - 8pm</span>
            <span>0327-2462321</span>
          </Link>

          <Link to="/contact" className="text-sm text-gray-300 hover:text-[#00E5A0] transition">
            sumairrrkhan21@gmail.com
          </Link>

          <Link to="/contact" className="text-sm text-gray-300 hover:text-[#00E5A0] transition">
            Near Gulshan-e-Iqbal
          </Link>
        </div>
      </div>

      <hr className="border-gray-700" />
      <div className="text-center py-1 text-gray-400 text-sm">
        <p>© 2025 Sumair Pvt. Ltd.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
