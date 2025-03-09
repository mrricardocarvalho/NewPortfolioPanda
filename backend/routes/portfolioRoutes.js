const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const Asset = require('../models/Asset');
const { Op } = require('sequelize');
const { getRealTimePrice } = require('../utils/alphaVantage');

// GET all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
});

// GET a portfolio by ID
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// POST a new portfolio
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Portfolio name is required' });
    }
    const portfolio = await Portfolio.create({ name });
    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
});

// PUT to update a portfolio
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    await portfolio.update({ name });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
});

// DELETE a portfolio
router.delete('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    await portfolio.destroy();
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
});

// GET portfolio value with real-time prices
router.get('/:id/value', async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { portfolioId: id },
      include: [{ model: Asset, attributes: ['symbol'] }],
    });

    if (!transactions.length) {
      return res.status(404).json({ error: 'No transactions found for this portfolio' });
    }

    let portfolioValue = 0;
    const assetHoldings = {};

    // Calculate holdings from transactions
    transactions.forEach((transaction) => {
      const { assetId, transactionType, quantity, symbol } = transaction;
      if (!assetHoldings[assetId]) {
        assetHoldings[assetId] = { quantity: 0, symbol };
      }
      if (transactionType === 'buy') {
        assetHoldings[assetId].quantity += quantity;
      } else if (transactionType === 'sell') {
        assetHoldings[assetId].quantity -= quantity;
      }
    });

    // Fetch real-time prices and calculate total value
    for (const assetId in assetHoldings) {
      const { quantity, symbol } = assetHoldings[assetId];
      if (quantity > 0) {
        const currentPrice = await getRealTimePrice(symbol);
        portfolioValue += quantity * currentPrice;
      }
    }

    res.json({ portfolioValue });
  } catch (error) {
    console.error('Error calculating portfolio value:', error);
    res.status(500).json({ error: 'Failed to calculate portfolio value' });
  }
});

// GET transaction history for a portfolio
router.get('/:id/transactions', async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { portfolioId: id },
      include: [{ model: Asset, attributes: ['symbol'] }],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
});

module.exports = router;