const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const Asset = require('../models/Asset');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// GET a transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, quantity, price, date, portfolioId, assetId } = req.body;
    if (!type || !quantity || !price || !date || !portfolioId || !assetId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const asset = await Asset.findByPk(assetId);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    const transaction = await Transaction.create({ type, quantity, price, date, portfolioId, assetId });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// PUT to update a transaction
router.put('/:id', async (req, res) => {
  try {
    const { type, quantity, price, date, portfolioId, assetId } = req.body;
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    if (portfolioId) {
      const portfolio = await Portfolio.findByPk(portfolioId);
      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }
    }
    if (assetId) {
      const asset = await Asset.findByPk(assetId);
      if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
      }
    }
    await transaction.update({ type, quantity, price, date, portfolioId, assetId });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.destroy();
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = router;