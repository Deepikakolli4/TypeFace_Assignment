import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-overlay">
          <header className="home-header">
            <h1 className="home-title">Personal Finance Tracer💰</h1>
            <p className="home-subtitle">Your Trusted Partner for Financial Management</p>
          </header>
          <section className="home-intro">
            <p className="home-description">
              Efficiently manage your financial portfolio with our intuitive tools. Track income and expenses, upload receipts or PDFs for seamless transaction recording, and gain insights through detailed analytics.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Home;