const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const User = require('../../models/User');

// get all user
router.get('/', (req, res) => {
  User.findAll({})
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     //  to save user logged in and user id
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.loggedIn = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// the api/user/signup endpoint
//sign up create new account Routes
router.post('/signup', async (req, res) => {
  const newAcount = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  };
  try {
      const userData = await User.create(newAcount);
      if (!userData) {
          res.status(404).json({ message: 'Please filled all the required and try again' })
          return
      }
      // console.log(userData)
      req.session.save(() => {
        // req.session.loggedIn = true;
        res.json({ message: `Register successed, Welcome ${userData.username} To Our Website!`, status:201});
        return;
      });

  } catch (err) {
      res.status(404).json({message:'Please check your information again'})
  }
  console.log({message:'/api/user/singup POST routes had run'})
});

// login route
//check user info through signin page
// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// update an user (we using this to closed the alert)
router.put('/:id', (req, res) => {
  User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      // phone: req.body.phone,
    },
    {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    }
  )
  .then((results) => {
    res.json({
      message: 'profile update successfully',
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
