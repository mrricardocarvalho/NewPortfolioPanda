import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const TransactionHistory = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/api/portfolios/${id}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [id]);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.transactionType.toUpperCase()} {transaction.quantity} of {transaction.symbol} at ${transaction.price} on {new Date(transaction.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;