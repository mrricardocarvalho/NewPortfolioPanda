import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');

  // Fetch watchlist and available assets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchlistRes = await axios.get('/api/watchlist');
        setWatchlist(watchlistRes.data);
        const assetsRes = await axios.get('/api/assets');
        setAssets(assetsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Add asset to watchlist
  const handleAdd = async () => {
    if (!selectedAsset) {
      alert('Please select an asset to add');
      return;
    }
    try {
      await axios.post('/api/watchlist', { assetId: selectedAsset });
      const watchlistRes = await axios.get('/api/watchlist');
      setWatchlist(watchlistRes.data);
      setSelectedAsset('');
    } catch (error) {
      console.error('Error adding asset to watchlist:', error);
    }
  };

  // Remove asset from watchlist
  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/watchlist/${id}`);
      const watchlistRes = await axios.get('/api/watchlist');
      setWatchlist(watchlistRes.data);
    } catch (error) {
      console.error('Error removing asset from watchlist:', error);
    }
  };

  return (
    <div>
      <h2>Watchlist</h2>
      <div>
        <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
          <option value="">Select Asset to Add</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.symbol} ({asset.type})
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add to Watchlist</button>
      </div>
      <ul>
        {watchlist.map((entry) => (
          <li key={entry.id}>
            {entry.Asset.symbol} ({entry.Asset.type})
            <button onClick={() => handleRemove(entry.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;