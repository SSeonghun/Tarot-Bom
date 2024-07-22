import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold"><Link to="/" className="text-white hover:text-gray-400">Home</Link></div>
        <div className="space-x-4">
          <Link to="/about" className="text-white hover:text-gray-400">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
          <button className='border border-spacing-x-12'><Link to="/login" className="text-white hover:text-gray-400">Contact</Link></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
