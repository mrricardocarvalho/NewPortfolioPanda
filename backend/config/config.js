const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Database file will be created in the backend directory
});

module.exports = sequelize;