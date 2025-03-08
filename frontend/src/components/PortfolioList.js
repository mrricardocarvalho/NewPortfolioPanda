import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('/api/portfolios');
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