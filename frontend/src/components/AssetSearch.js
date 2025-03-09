import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AssetSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!keyword) {
      setError('Please enter a keyword');
      return;
    }
    try {
      const response = await axios.get(`/api/assets/search?keyword=${keyword}`);
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to search assets. Please try again.');
      console.error('Error searching assets:', err);
    }
  };

  return (
    <div>
      <h2>Search Assets</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter asset name or symbol"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((asset) => (
          <li key={asset['1. symbol']}>
            <Link to={`/asset/${asset['1. symbol']}`}>
              {asset['2. name']} ({asset['1. symbol']})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetSearch;