// Exporting Files
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
    console.log('\n----- USER SEEDED -----\n');
  
  await seedPosts();
    console.log('\n----- POST SEEDED -----\n');

  await seedComments();
    console.log('\n----- COMMENT SEEDED -----\n');

    console.log('\n----- SEEDED COMPLETED -----\n');

  process.exit(0);
};

seedAll();
