// Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('name')
    navigate('/')
  }
  return (
    <nav className="w-full bg-gradient-to-r from-red-500 to-yellow-50 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Hospital Management</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
