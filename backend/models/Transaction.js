const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Portfolio = require('./Portfolio');
const Asset = require('./Asset');

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.STRING, // Buy or Sell
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define relationships
Transaction.belongsTo(Portfolio);
Transaction.belongsTo(Asset);

module.exports = Transaction;