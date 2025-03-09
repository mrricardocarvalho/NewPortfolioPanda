import React, { useState, useEffect } from 'react';
import api from '../api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/portfolios');
        setPortfolios(response.data);
        const values = {};
        await Promise.all(
          response.data.map(async (portfolio) => {
            const valueResponse = await api.get(`/api/portfolios/${portfolio.id}/value`);
            values[portfolio.id] = valueResponse.data.portfolioValue;
          })
        );
        setPortfolioValues(values);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  // Mock data for chart (replace with real data later)
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Example months
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolios.map((p) => portfolioValues[p.id] || 0), // Dynamic values
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Portfolio Value Over Time' },
    },
  };

  return (
    <div>
      <h2>Portfolio Dashboard</h2>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            {portfolio.name} - Current Value: ${portfolioValues[portfolio.id] || 'Loading...'}
          </li>
        ))}
      </ul>
      <div style={{ width: '600px', margin: '20px auto' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;