import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await api.get('/api/portfolios');
        setPortfolios(response.data);
        
        // Fetch values for each portfolio
        response.data.forEach(async (portfolio) => {
          try {
            const valueResponse = await api.get(`/api/portfolios/${portfolio.id}/value`);
            setValues((prev) => ({ 
              ...prev, 
              [portfolio.id]: valueResponse.data.portfolioValue 
            }));
          } catch (err) {
            console.error(`Error fetching value for portfolio ${portfolio.id}:`, err);
          }
        });
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to fetch portfolios. Please try again later.');
        }
      }
    };
    fetchPortfolios();
  }, [navigate]);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>Your Portfolios</h2>
      {portfolios.length === 0 ? (
        <p>No portfolios found. <Link to="/add-portfolio">Create one!</Link></p>
      ) : (
        <ul>
          {portfolios.map((portfolio) => (
            <li key={portfolio.id}>
              {portfolio.name} - Value: ${values[portfolio.id] || 'Loading...'} 
              {' '}<Link to={`/portfolio/${portfolio.id}/transactions`}>View Transactions</Link>
              {' '}<Link to={`/edit-portfolio/${portfolio.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add-portfolio">
        <button>Add New Portfolio</button>
      </Link>
    </div>
  );
};

export default PortfolioList;