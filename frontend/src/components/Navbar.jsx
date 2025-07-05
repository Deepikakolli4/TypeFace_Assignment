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
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/transactions" className="nav-link">Transactions</Link>
      <Link to="/upload" className="nav-link">Upload</Link>
      {token ? (
        <button onClick={handleLogout} className="nav-button">Logout</button>
      ) : (
        <>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;