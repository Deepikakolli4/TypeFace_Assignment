import React, { useState, useEffect } from 'react';
import '../App.css';
import { getSummary } from '../api/api';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const SummaryChart = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    categories: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getSummary();
        console.log('API Response:', response.data); // Debug API response
        setSummary({
          totalIncome: response.data.totalIncome || 0,
          totalExpense: response.data.totalExpense || 0,
          categories: response.data.categories || [],
        });
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch summary');
      }
    };
    fetchSummary();
  }, []);

  // Pie chart data for expense categories
  const pieData = {
    labels: summary.categories.map((cat) => cat.name) || [],
    datasets: [
      {
        label: 'Expenses by Category',
        data: summary.categories.map((cat) => cat.amount) || [],
        backgroundColor: [
          '#36A2EB', // Blue
          '#FF6384', // Red
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966CC', // Purple
          '#FF9F40', // Orange
        ],
        hoverOffset: 12,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expenses by Category (Pie Chart)' },
    },
  };

  // Bar chart data for Income vs Expense
  const barData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [summary.totalIncome, summary.totalExpense],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Income vs Expense (Bar Graph)' },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="form-title">Summary</h3>
      {error && <p className="error-message">{error}</p>}
      {summary.categories.length > 0 ? (
        <>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </>
      ) : (
        <p className="no-data">No category data available</p>
      )}
    </div>
  );
};

export default SummaryChart;