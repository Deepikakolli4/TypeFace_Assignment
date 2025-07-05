import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Personal Finance Assistant</h1>
        <p className="home-subtitle">Your Trusted Partner for Financial Management</p>
      </header>
      <section className="home-intro">
        <p className="home-description">
          Efficiently manage your financial portfolio with our intuitive tools. Track income and expenses, upload receipts or PDFs for seamless transaction recording, and gain insights through detailed analytics.
        </p>
      </section>
      <section className="home-actions">
        <Link to="/register" className="home-button">Register</Link>
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/dashboard" className="home-button">Dashboard</Link>
        <Link to="/transactions" className="home-button">Transactions</Link>
        <Link to="/upload" className="home-button">Upload Receipt/PDF</Link>
      </section>
    </div>
  );
};

export default Home;