import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PortfolioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`/api/portfolios/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/portfolios/${id}`, { name });
      alert('Portfolio updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Portfolio</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Portfolio Name"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default PortfolioEdit;