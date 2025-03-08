const sequelize = require('../config/config');
const Portfolio = require('../models/Portfolio');

const seedPortfolios = async () => {
  await sequelize.sync({ force: true }); // Sync before seeding
  await Portfolio.create({ name: 'My First Portfolio' });
  console.log('Seed data inserted');
  process.exit();
};

seedPortfolios();