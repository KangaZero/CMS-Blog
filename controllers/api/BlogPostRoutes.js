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

router.get('/:id', async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id,{
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


//Post route
router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
        //Users can only add content for security reasons
          content: req.body.content,
          //TODO test on website
          user_id: 1
        //    req.session.user_id,
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

//Update route
router.put('/:id', async (req, res) => {
    try {
        const updateBlogPost = await BlogPost.update(
            {
                //Users can only edit content for security reasons
                content: req.body.content,
            },
            {
            where: {
                id: req.params.id
                // req.session.user_id 
                }
            },
        );
        if (!updateBlogPost) {
            return res.status(404).json({ message: 'No such post found!' });
          } else {
            res.status(200).json(updateBlogPost)
          }
    } catch (err) {
        res.status(500).json(err);
      }
});

//Delete route
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await BlogPost.destroy({
            where: {
              id: req.params.id,
            },
          });
      
          if (!deletePost) {
            return res.status(404).json({ message: 'No such post found!' });
          } else {
                res.status(200).json(deletePost)
          }
    } catch (err) {
        res.status(500).json(err);
      }
});

  module.exports = router;