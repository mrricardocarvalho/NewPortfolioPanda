const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const Asset = require('../models/Asset');

// GET all watchlist assets
router.get('/', async (req, res) => {
  try {
    const watchlist = await Watchlist.findAll({
      include: [{ model: Asset, attributes: ['symbol', 'type'] }],
    });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

// POST add an asset to the watchlist
router.post('/', async (req, res) => {
  try {
    const { assetId } = req.body;
    if (!assetId) {
      return res.status(400).json({ error: 'Asset ID is required' });
    }
    const asset = await Asset.findByPk(assetId);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    const watchlistEntry = await Watchlist.create({ assetId });
    res.status(201).json(watchlistEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add asset to watchlist' });
  }
});

// DELETE remove an asset from the watchlist
router.delete('/:id', async (req, res) => {
  try {
    const watchlistEntry = await Watchlist.findByPk(req.params.id);
    if (!watchlistEntry) {
      return res.status(404).json({ error: 'Watchlist entry not found' });
    }
    await watchlistEntry.destroy();
    res.json({ message: 'Asset removed from watchlist successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove asset from watchlist' });
  }
});

module.exports = router;