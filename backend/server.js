const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const sequelize = require('./config/config');
const Portfolio = require('./models/Portfolio');
const Asset = require('./models/Asset');
const Transaction = require('./models/Transaction');
const Watchlist = require('./models/Watchlist');
const portfolioRoutes = require('./routes/portfolioRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
// const watchlistRoutes = require('./routes/watchlistRoutes');
// const assetRoutes = require('./routes/assetRoutes');



// Sync models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/assets', async (req, res) => {
  try {
    const { symbol, type } = req.body;
    if (!symbol || !type) {
      return res.status(400).json({ error: 'Symbol and type are required' });
    }
    const asset = await Asset.create({ symbol, type });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/portfolios', portfolioRoutes);
app.use('/api/transactions', transactionRoutes);
// app.use('/api/watchlist', watchlistRoutes);
// app.use('/api/assets', assetRoutes);