const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Asset = sequelize.define('Asset', {
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // e.g., stock, ETF, crypto
    allowNull: false,
  },
});

module.exports = Asset;