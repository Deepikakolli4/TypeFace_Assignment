import React, { useState } from 'react';
import { createTransaction } from '../api/api';
import '../App.css';

const TransactionForm = ({ onTransactionCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    type: 'expense',
    category: 'Utility',
    description: '',
  });
  const [error, setError] = useState('');

  const categories = [
    'Utility',
    'Savings',
    'Food',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Shopping',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (formData.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (!formData.date) {
      setError('Date is required');
      return;
    }

    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount), // Convert to number
    };

    try {
      console.log('Sending data:', dataToSend); // Debug: Log payload
      const response = await createTransaction(dataToSend);
      console.log('API response:', response.data); // Debug: Log response
      onTransactionCreated(response.data);
      setFormData({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Reset to today's date
        type: 'expense',
        category: 'Utility',
        description: '',
      });
      setError('');
    } catch (err) {
      console.error('API error:', err.response?.data, err.message); // Debug: Log error
      setError(err.response?.data?.error || 'Failed to create transaction');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3 className="form-title">Add Transaction</h3>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter transaction title"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type" className="form-label">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="" disabled>Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="" disabled>Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description (optional)"
          className="form-textarea"
          rows="4"
        />
      </div>

      <button type="submit" className="form-button">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;