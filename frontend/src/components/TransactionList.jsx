import React, { useState, useEffect, useCallback } from 'react';
import { getTransactions, deleteTransaction } from '../api/api';
import '../App.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ start: '', end: '', type: 'all', page: 1, limit: 8 });
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      console.log('Fetching transactions with filters:', filters);
      const response = await getTransactions(filters);
      console.log('API response:', response.data);
      setTransactions(response.data.transactions || []);
      setTotal(response.data.total || 0);
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch transactions';
      console.error('Fetch error:', err);
      setError(errorMessage);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete transaction');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / filters.limit)) {
      setFilters({ ...filters, page: newPage });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US');
  };

  const maxPages = Math.ceil(total / filters.limit) || 1;

  return (
    <div className="transcation-list-container">
      {error && <p className="error-message">{error}</p>}
      <div className="filter-group">
        <div className="form-group">
          <label htmlFor="start" className="form-label">Start Date</label>
          <input
            type="date"
            id="start"
            name="start"
            value={filters.start}
            onChange={handleFilterChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end" className="form-label">End Date</label>
          <input
            type="date"
            id="end"
            name="end"
            value={filters.end}
            onChange={handleFilterChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <table className="transcation-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>₹{tx.amount.toFixed(2)}</td>
                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>{formatDate(tx.createdAt)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="action-button delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className={filters.page === 1 ? 'pagination-button-disabled' : 'pagination-button'}
        >
          Previous
        </button>
        <span className="pagination-info">Page {filters.page} of {maxPages}</span>
        <button
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page === maxPages}
          className={filters.page === maxPages ? 'pagination-button-disabled' : 'pagination-button'}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionList;