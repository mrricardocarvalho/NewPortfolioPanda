import React, { useState, useEffect } from 'react';
import api from '../api';

const TransactionForm = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [assets, setAssets] = useState([]);
  const [portfolioId, setPortfolioId] = useState('');
  const [assetId, setAssetId] = useState('');
  const [type, setType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfoliosRes = await api.get('/api/portfolios');
        setPortfolios(portfoliosRes.data);
        // Temporary endpoint for assets (replace later)
        const assetsRes = await api.get('/api/assets');
        setAssets(assetsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/transactions', {
        type,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        date,
        portfolioId,
        assetId,
      });
      alert('Transaction added successfully');
      // Reset form fields
      setType('buy');
      setQuantity('');
      setPrice('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <select value={portfolioId} onChange={(e) => setPortfolioId(e.target.value)} required>
        <option value="">Select Portfolio</option>
        {portfolios.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={assetId} onChange={(e) => setAssetId(e.target.value)} required>
        <option value="">Select Asset</option>
        {assets.map((a) => (
          <option key={a.id} value={a.id}>{a.symbol}</option>
        ))}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;