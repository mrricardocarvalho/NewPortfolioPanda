import React, { useState, useEffect } from 'react';
import api from '../api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPortfolioData = async () => {
    try {
      const response = await api.get('/api/portfolios');
      const portfoliosData = response.data;
      setPortfolios(portfoliosData);

      const values = {};
      await Promise.all(
        portfoliosData.map(async (portfolio) => {
          const valueResponse = await api.get(`/api/portfolios/${portfolio.id}/value`);
          values[portfolio.id] = valueResponse.data.portfolioValue;
        })
      );
      setPortfolioValues(values);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  useEffect(() => {
    fetchPortfolioData(); // Initial fetch
    const interval = setInterval(fetchPortfolioData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleRefresh = () => {
    fetchPortfolioData(); // Manual refresh
  };

  // Chart data (simplified for now)
  const chartData = {
    labels: portfolios.map((p) => p.name),
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolios.map((p) => portfolioValues[p.id] || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Real-Time Portfolio Values' },
    },
  };

  return (
    <div>
      <h2>Portfolio Dashboard</h2>
      <p>Last Updated: {lastUpdated || 'Loading...'}</p>
      <button onClick={handleRefresh}>Refresh Now</button>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            {portfolio.name} - Current Value: ${portfolioValues[portfolio.id]?.toFixed(2) || 'Loading...'}
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