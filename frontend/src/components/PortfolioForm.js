import React, { useState } from 'react';
import axios from 'axios';

const PortfolioForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/portfolios', { name });
      setName('');
      alert('Portfolio created successfully');
    } catch (error) {
      console.error('Error creating portfolio:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Portfolio</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Portfolio Name"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default PortfolioForm;