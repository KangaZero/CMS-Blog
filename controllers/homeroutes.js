const router = require('express').Router();
const { User, BlogPost, Comment  } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {

        const blogPostData = await BlogPost.findAll({
            include:[ 
                { model: Comment, include: { model: User, attributes: { exclude: ['password'] } } }, 
                { model: User, attributes: { exclude: ['password'] } }
            ]
        })

        const blogPosts = blogPostData.map(data => data.get({ plain: true }));

        console.log(req.session)

    res.render('homepage', {
        blogPosts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
        });

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//profile routes
router.get('/dashboard', withAuth, async (req, res) => {
    const userId = req.session.user_id
  
    res.redirect(`/dashboard/${userId}`)
  });


router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogPost }, { model: Comment }],
      });
  
      const user = userData.get({ plain: true });
   
      res.render('dashboard', {
        user,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/updatepost/:id', withAuth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: { model: User, attributes: { exclude: ['password'] } },
      });
  
      const blogPost = blogPostData.get({ plain: true });

      if(req.session.user_id === blogPost.user_id) {
        res.render('updatepost', {
            blogPost,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } else {
        res.redirect('/')
    }

    } catch (err) {
      res.status(500).json(err);
    }
  });

  


  //TODO edit
router.get('/updateProfile', async (req, res) => {
    try {
  
      const userData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.session.user_id
        }
      })
  
      if (!userData) {
        res.status(404).json({ message: "User not found!" })
      }
  
      const user = userData.get({ plain: true });
  
    res.render('updateProfile', {
      user,
      logged_in: req.session.logged_in,
    })
  } catch(err) {
    res.status(500).json(err);
  }
  });

router.get('/post', withAuth, async (req, res) => {
    try {
      res.render('post', {
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }
    
      res.render('signup');
});
  

  module.exports = router;