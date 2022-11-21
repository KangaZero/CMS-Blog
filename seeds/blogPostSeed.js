const { faker } = require('@faker-js/faker');
const { BlogPost } = require('../models');

// manually copied from insomnia, as faker npm doesn't work on Heroku
const blogPostArray = [
  {
    title: 'Necessitatibus',
    content: 'Labore quis unde vero voluptatibus ad quas adipisci cumque voluptate.',
    user_id: 1
  },
  {
    title: 'Officia',
    content: 'Earum voluptates at ut voluptate a quis unde voluptatem inventore.',
    user_id: 2
  },
  {
    title: 'Corrupti',
    content: 'Occaecati fuga asperiores consectetur perspiciatis quis quis sed necessitatibus unde.',
    user_id: 3
  },
  {
    title: 'Dolores',
    content: 'Quaerat praesentium sapiente rem ducimus inventore odio aspernatur dolore consectetur.',
    user_id: 4
  },
  {
    title: 'Enim',
    content: 'Excepturi rerum delectus omnis ullam mollitia eligendi magni in doloribus.',
    user_id: 5
  }
];

// for (let i = 0; i <= 10; i++) {
//     const blogPostData = {
//         //arg is word Count
//         // reference: https://fakerjs.dev/api/lorem.html#paragraph
//         title: faker.lorem.sentence(1),
//         content: faker.lorem.sentence(10),
//         user_id: i+1,
//     };

//     blogPostArray.push(blogPostData);
// };

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostArray);

module.exports = seedBlogPosts;