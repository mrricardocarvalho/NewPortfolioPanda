const axios = require('axios');

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const priceCache = {}; // Simple in-memory cache

const getRealTimePrice = async (symbol) => {
  if (priceCache[symbol] && Date.now() - priceCache[symbol].timestamp < 60000) {
    return priceCache[symbol].price; // Use cached price if less than 1 minute old
  }
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY,
      },
    });
    const quote = response.data['Global Quote'];
    if (!quote || !quote['05. price']) {
      throw new Error('No price data returned');
    }
    const price = parseFloat(quote['05. price']);
    priceCache[symbol] = { price, timestamp: Date.now() };
    return price;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error.message);
    throw error;
  }
};

module.exports = { getRealTimePrice };