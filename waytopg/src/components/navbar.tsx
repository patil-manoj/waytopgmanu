import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">Way2PG</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/listings" className="text-gray-600 hover:text-green-600 transition">Listings</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-green-600 transition">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-green-600 transition">Contact</Link></li>
            <li><Link to="/login" className="text-gray-600 hover:text-green-600 transition">Login</Link></li>
            {/* <li><Link to="/signup" className="text-gray-600 hover:text-green-600 transition">Sign Up</Link></li> */}
          </ul>
        </nav>
        <button className="md:hidden text-green-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;