const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Asset = require('./Asset');

const Watchlist = sequelize.define('Watchlist', {
  // No additional fields needed; just a relation to Asset
});

// Define relationship
Watchlist.belongsTo(Asset);

module.exports = Watchlist;