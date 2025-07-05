import React, { useState, useEffect } from 'react';
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
import '../App.css';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const SummaryChart = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getSummary();
        setSummary(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch summary');
      }
    };
    fetchSummary();
  }, []);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [summary.totalIncome, summary.totalExpense],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Income vs Expense (Pie Chart)' },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Income vs Expense (Bar Graph)' },
    },
  };

  return (
    <div className='chart-container'>
      <h3 className='form-title'>Summary</h3>
      {error && <p className='error-message'>{error}</p>}
      <div className='chart-wrapper'>
        <Pie data={data} options={pieOptions} />
      </div>
      <div className='chart-wrapper'>
        <Bar data={data} options={barOptions} />
      </div>
    </div>
  );
};

export default SummaryChart;
