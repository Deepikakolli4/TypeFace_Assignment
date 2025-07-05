import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="page-container home-container">
      <h1 className="home-title">Welcome to Personal Finance Assistant</h1>
      <p className="home-description">
        Manage your finances with ease. Track your income and expenses, upload receipts or PDFs to extract transactions, and visualize your spending with insightful charts.
      </p>
      <div className="home-actions">
        <Link to="/register" className="form-button home-button">
          Register
        </Link>
        <Link to="/login" className="form-button home-button">
          Login
        </Link>
        <Link to="/dashboard" className="form-button home-button">
          Dashboard
        </Link>
        <Link to="/transactions" className="form-button home-button">
          Transactions
        </Link>
        <Link to="/upload" className="form-button home-button">
          Upload Receipt/PDF
        </Link>
      </div>
    </div>
  );
};

export default Home;