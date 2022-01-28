const sequelize = require('../config/connection');
// const { User } = require('../models');
const userSeed = require('./userData')

const userData = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
