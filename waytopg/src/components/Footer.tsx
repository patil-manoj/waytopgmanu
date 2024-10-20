import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-2xl font-bold mb-4 text-green-400">EcoStay</h4>
            <p className="text-gray-400">Finding the best eco-friendly homes for conscious students worldwide.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-green-400 transition">FAQs</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-green-400 transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-green-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@ecostay.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
            <div className="mt-4 flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EcoStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;