import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import PortfolioEdit from './components/PortfolioEdit';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Watchlist from './components/Watchlist';
import AssetSearch from './components/AssetSearch';
import AssetDetails from './components/AssetDetails';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionHistory from './components/TransactionHistory';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/add-portfolio">Add Portfolio</Link></li>
          <li><Link to="/transactions">View Transactions</Link></li>
          <li><Link to="/add-transaction">Add Transaction</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/search-assets">Search Assets</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><PortfolioList /></ProtectedRoute>} />
        <Route path="/add-portfolio" element={<ProtectedRoute><PortfolioForm /></ProtectedRoute>} />
        <Route path="/edit-portfolio/:id" element={<ProtectedRoute><PortfolioEdit /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionList /></ProtectedRoute>} />
        <Route path="/add-transaction" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
        <Route path="/search-assets" element={<AssetSearch />} />
        <Route path="/asset/:symbol" element={<AssetDetails />} />
        <Route path="/portfolio/:id/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;