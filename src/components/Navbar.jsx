// Navbar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LogOut, Moon, Sun, Hospital } from 'lucide-react';


function Navbar() {
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(ThemeContext)
  const handleLogout = () => {
    localStorage.removeItem('name')
    navigate('/')
  }

  return (
    <nav className="w-full bg-gradient-to-r from-sky-500 to-white dark:from-blue-800 dark:to-blue-300 text-white px-6 py-4 shadow-md flex justify-between items-center">

      <div className="flex items-center space-x-2">
        <Hospital className="w-6 h-6 text-white" />
        <h1 className="text-xl font-bold">Hospital Management</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setTheme(!theme)}
          className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
        >
          {theme ? <Sun className="w-5 text-yellow-600 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{theme ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-white transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>

  );
}

export default Navbar;
