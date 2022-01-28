const sequelize = require('../config/connection');
// const { User } = require('../models');
const userSeed = require('./userData')
const postSeed = require('./postData');
const commentSeed = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("database synced")

  await userSeed();
  console.log("User seeding complete")

  await postSeed();
  console.log("Post seeding complete")

  await commentSeed();
  console.log("Comment seeding complete")

  process.exit(0);
};

seedDatabase();
