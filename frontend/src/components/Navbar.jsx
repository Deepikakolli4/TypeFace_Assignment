import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="nav-button">Home</Link>
      {token ? (
        <>
          <Link to="/dashboard" className="nav-button">Dashboard</Link>
          <Link to="/transactions" className="nav-button">Transactions</Link>
          <Link to="/upload" className="nav-button">Upload</Link>
          <button onClick={handleLogout} className="nav-button nav-button-logout">Logout</button>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="nav-button">Dashboard</Link>
          <Link to="/transactions" className="nav-button">Transactions</Link>
          <Link to="/upload" className="nav-button">Upload</Link>
          <Link to="/register" className="nav-button">Register</Link>
          <Link to="/login" className="nav-button">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;