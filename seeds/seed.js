const sequelize = require('../config/connection');
//Models included just in case and for convenience
const { User, BlogPost, Comment } = require('../models');

const seedUsers = require('./userSeed');
const seedBlogPosts = require('./blogPostSeed');
const seedComments = require('./commentSeed');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();

  console.log('\n----- Users SEEDED-----\n');

  await seedBlogPosts();

  console.log('\n----- Blog Posts SEEDED-----\n');

  await seedComments();

  console.log('\n----- Comments SEEDED-----\n');

  process.exit(0);

};

seedDatabase();
