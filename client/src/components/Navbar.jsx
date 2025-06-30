import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex gap-6">
      <Link to="/" className="hover:underline">Dashboard</Link>
      <Link to="/upload" className="hover:underline">Upload</Link> 
      <Link to="/viewer" className="hover:underline">Viewer</Link>  
      <Link to="/signature" className="hover:underline">SignaturePad</Link> 

      <div className="ml-auto flex gap-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
