const router = require('express').Router();
const { PetAds, Category, User, SavedPetsTag } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {


    res.render('homepage', {
       
        logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//profile routes
router.get('/profile', async (req, res) => {
    const userId = req.session.user_id
  
    res.redirect(`/profile/${userId}`)
  });


  //TODO Edit
router.get('/profile/:id', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: PetAds, through: SavedPetsTag }],
        // limit: 5
      });
  
      //get petAds data where petAds.seller_id matches User.id || req.params.id
      const userPetAdData = await PetAds.findAll({
        where: {
          seller_id: req.params.id
        }
      });
  
      const user = userData.get({ plain: true });
      const userPetAds = userPetAdData.map(data => data.get({ plain: true }));
  
      res.render('profile', {
        user,
        userPetAds,
        currentUserId: req.session.user_id,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
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
    })
  } catch(err) {
    res.status(500).json(err);
  }
  });

  router.get('/post', withAuth, async (req, res) => {
    try {
      res.render('postThread', {
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
  

  module.exports = router;