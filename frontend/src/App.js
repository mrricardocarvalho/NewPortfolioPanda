import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import PortfolioEdit from './components/PortfolioEdit';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Portfolio</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PortfolioList />} />
        <Route path="/add" element={<PortfolioForm />} />
        <Route path="/edit/:id" element={<PortfolioEdit />} />
      </Routes>
    </Router>
  );
};

export default App;