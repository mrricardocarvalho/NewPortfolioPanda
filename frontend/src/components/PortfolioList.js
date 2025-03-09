import React, { useState, useEffect } from 'react';
import api from '../api';

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await api.get('/api/portfolios');
        setPortfolios(response.data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <div>
      <h2>Portfolios</h2>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>{portfolio.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;