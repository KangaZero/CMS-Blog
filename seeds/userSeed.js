const { User } = require('../models');
const { faker } = require('@faker-js/faker');
const { randomUserRole, randomPasswordGenerator } = require('./utils/helpers');

const userArray = [];

// generate 10 users
for (let i = 0; i <= 10; i++) {
    const counter = i
    const userData = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(10, true),
    };

    userArray.push(userData);
};


const seedUsers = () => User.bulkCreate(userArray, {
    individualHooks: true,
});

module.exports = seedUsers;

