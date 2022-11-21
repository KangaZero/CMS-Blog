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
        // { model: Comment, include: { model: User, attributes: { exclude: ['password'] } } },
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
        // { model: Comment, include: { model: User, attributes: { exclude: ['password'] } } },
        { model: User, attributes: { exclude: ['password'] } }
      ]
    });

    req.session.save(() => {
      req.session.current_blog_post_id = blogPostData.id;
      res.status(200).json(blogPostData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Post route
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      //Users can only add content and title for security reasons
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      req.session.blog_post_id = newBlogPost.id;
      res.status(200).json(newBlogPost);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update route
router.put('/', async (req, res) => {
  try {
    const updateBlogPost = await BlogPost.update(
      {
        //Users can only edit content and title for security reasons
        content: req.body.content,
        title: req.body.title,
      },
      {
        where: {
          id:  req.session.post_id,
        }
      },
    );
    if (!updateBlogPost) {
      return res.status(404).json({ message: 'No such post found!' });
    } else {
      res.status(200).json(updateBlogPost);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete route
router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: { model: User, attributes: { exclude: ['password'] } },
    });

    const blogPost = blogPostData.get({ plain: true });

    //checks to see if the blogPost belongs to current User
    if(req.session.user_id === blogPost.user_id) {

      const deletePost = await BlogPost.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deletePost) {
        return res.status(404).json({ message: 'No such post found!' });
      } else {
        res.status(200).json(deletePost);
      }
    } else {
      res.redirect('/dashboard');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
