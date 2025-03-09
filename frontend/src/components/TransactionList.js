import React, { useState, useEffect } from 'react';
import api from '../api';

const TransactionList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState('');

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

  useEffect(() => {
    if (selectedPortfolio) {
      const fetchTransactions = async () => {
        try {
          const response = await api.get(`/api/transactions?portfolioId=${selectedPortfolio}`);
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
      fetchTransactions();
    }
  }, [selectedPortfolio]);

  return (
    <div>
      <h2>Transactions</h2>
      <select value={selectedPortfolio} onChange={(e) => setSelectedPortfolio(e.target.value)}>
        <option value="">Select Portfolio</option>
        {portfolios.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type.toUpperCase()} {t.quantity} of Asset ID {t.assetId} at ${t.price} on {t.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;