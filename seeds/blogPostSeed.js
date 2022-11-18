const { faker } = require('@faker-js/faker');
const { BlogPost } = require('../models');

const blogPostArray = [];

for (let i = 0; i <= 10; i++) {
    const blogPostData = {
        //arg is word Count
        // reference: https://fakerjs.dev/api/lorem.html#paragraph
        title: faker.lorem.sentence(1),
        content: faker.lorem.sentence(10),
        user_id: i+1,
    };

    blogPostArray.push(blogPostData);
};

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostArray);

module.exports = seedBlogPosts;