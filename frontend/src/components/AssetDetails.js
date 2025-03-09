import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const AssetDetails = () => {
  const { symbol } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/api/assets/details/${symbol}`);
        setDetails(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch asset details. Please try again.');
        console.error('Error fetching asset details:', err);
      }
    };
    fetchDetails();
  }, [symbol]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!details) {
    return <p>Loading...</p>;
  }

  // Extract dates and closing prices for a simple list
  const dates = Object.keys(details).slice(0, 30).reverse();
  const prices = dates.map((date) => details[date]['4. close']);

  return (
    <div>
      <h2>{symbol} - Daily Prices</h2>
      <ul>
        {dates.map((date, index) => (
          <li key={date}>
            {date}: ${prices[index]}
          </li>
        ))}
      </ul>
      {/* Optional: Add a chart library like Chart.js later */}
    </div>
  );
};

export default AssetDetails;