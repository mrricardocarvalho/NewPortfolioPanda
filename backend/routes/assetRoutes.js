const express = require('express');
const router = express.Router();
const axios = require('axios');

// Alpha Vantage API base URL
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// GET search assets by keyword
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: keyword,
        apikey: API_KEY,
      },
    });
    const matches = response.data.bestMatches || [];
    res.json(matches);
  } catch (error) {
    console.error('Error searching assets:', error);
    res.status(500).json({ error: 'Failed to search assets' });
  }
});

// GET detailed asset info (daily time series)
router.get('/details/:symbol', async (req, res) => {
  const { symbol } = req.params;
  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: API_KEY,
      },
    });
    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      return res.status(404).json({ error: 'No data found for this symbol' });
    }
    res.json(timeSeries);
  } catch (error) {
    console.error('Error fetching asset details:', error);
    res.status(500).json({ error: 'Failed to fetch asset details' });
  }
});

module.exports = router;