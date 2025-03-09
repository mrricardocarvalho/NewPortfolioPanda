import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import PortfolioEdit from './components/PortfolioEdit';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Watchlist from './components/Watchlist';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-portfolio">Add Portfolio</Link></li>
          <li><Link to="/transactions">View Transactions</Link></li>
          <li><Link to="/add-transaction">Add Transaction</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PortfolioList />} />
        <Route path="/add-portfolio" element={<PortfolioForm />} />
        <Route path="/edit-portfolio/:id" element={<PortfolioEdit />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
};

export default App;