const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get routes
router.get('/', async (req, res) => {
    try {
      const blogPostData = await BlogPost.findAll({
        //includes comments on post along with their associated creator(user)
        //And includes creator(user) of blogPost
        include:[ 
            { model: Comment, include: { model: User, attributes: { exclude: ['password'] } } }, 
            { model: User, attributes: { exclude: ['password'] } }
        ]
      });
      
      req.session.save(() => {
        // req.session.current_view_pet_id = blogPostData.id
        res.status(200).json(blogPostData);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
          ...req.body,
          //TODO test on website
          user_id: req.session.user_id,
        });
        //added for when user wants to put an image for said petAd
        req.session.save(() => {
          req.session.blog_post_id = newBlogPost.id;
          res.status(200).json(newBlogPost);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;