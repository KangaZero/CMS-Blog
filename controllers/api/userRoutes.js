const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get routes
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
          attributes: { exclude: ['password'] },
          include: [
            { model: BlogPost }, { model: Comment },
          ]
        });

        const users = userData.map((user) => 
        user.get({ plain: true })
        );
        
    res.status(200).json(users)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const userDataById = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [
            { model: BlogPost }, { model: Comment },
        ]
      })
  
      res.status(200).json(userDataById)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//post route
//for sign up
router.post('/', async (req, res) => {
    try {
      const postUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });

      req.session.save(() => {
        req.session.user_id = postUser.id;
        req.session.logged_in = true;
        res.status(200).json(postUser);
      });
    //   console.log(req.session.logged_in);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //Update route
router.put('/:id', async (req, res) => {
    try {
      const updateUser = await User.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        },
        {
          where: {
            id: req.params.id
            // req.session.user_id 
          },
        });
  
      if (!updateUser) {
        return res.status(404).json({ message: 'No such user found!' });
      } else {
        res.status(200).json(updateUser)
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })

//Delete route
router.delete('/:id', async (req, res) => {
    try {
      const deleteUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deleteUser) {
        return res.status(404).json({ message: 'No such user found!' });
      } else {
           res.status(200).json(deleteUser)
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })
  
  //Login route
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      
       req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });

    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //Logout route
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;