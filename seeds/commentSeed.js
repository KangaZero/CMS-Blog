const { Comment } = require('../models');
const { faker } = require('@faker-js/faker');


const commentArray = [];

for (let i = 0; i <= 10; i++) {

    const commentData = {
          //arg is word count
          // reference: https://fakerjs.dev/api/lorem.html#paragraph
        content: faker.lorem.sentence(5),
        user_id: i+1,
        blog_id: i+1,
    };

    commentArray.push(commentData);
};

const seedComments = () => Comment.bulkCreate(commentArray);

module.exports = seedComments;