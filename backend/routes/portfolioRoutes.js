const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

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

module.exports = router;