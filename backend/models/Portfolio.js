const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Portfolio = sequelize.define('Portfolio', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Portfolio;