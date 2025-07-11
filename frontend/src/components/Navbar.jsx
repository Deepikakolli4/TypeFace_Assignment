import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
       Personal Finance Assistant💰
      </div>
      <div className="nav-links">
        <NavLink 
          to="/home" 
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        >
          Home
        </NavLink>
         <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/transactions" 
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        >
          Transactions
        </NavLink>
        <NavLink 
          to="/upload" 
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        >
          Upload
        </NavLink>
      </div>
      <div className="auth-links">
        {token ? (
          <>
            <span className="nav-username">{username.toUpperCase()}</span>
            <button 
              onClick={handleLogout} 
              className="nav-button-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/register" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              Register
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;