const { User } = require('../models');
const { faker } = require('@faker-js/faker');
const { randomUserRole, randomPasswordGenerator } = require('./utils/helpers');

const userArray = [
  {
    first_name: 'Maci',
    last_name: 'Abernathy',
    email: 'Ariane.Kulas23@hotmail.com',
    password: 'password123'
  },
  {
    first_name: 'Dion',
    last_name: 'Mann',
    email: 'Reyna_Bins@hotmail.com',
    password: 'password123'
  },
  {
    first_name: 'Rex',
    last_name: 'Harris',
    email: 'Elenora_Jerde75@hotmail.com',
    password: 'password123'
  },
  {
    first_name: 'Maximillia',
    last_name: 'Douglas',
    email: 'Maryam.Effertz67@gmail.com',
    password: 'password123'
  },
  {
    first_name: 'Ahmed',
    last_name: 'Jones',
    email: 'Ima.Towne@hotmail.com',
    password: 'password123'
  }
];

// generate 10 users
// for (let i = 0; i <= 10; i++) {
//     const counter = i
//     const userData = {
//         first_name: faker.name.firstName(),
//         last_name: faker.name.lastName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(10, true),
//     };

//     userArray.push(userData);
// };


const seedUsers = () => User.bulkCreate(userArray, {
  individualHooks: true,
});

module.exports = seedUsers;

