const routes = require('express').Router();
const { Alert, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path=require('path')
const yahooFinance = require('yahoo-finance');
//homepage display routes
routes.get('/',async (req,res)=>{
  try {
    
    // Get all alerts and JOIN with user data
    const alertData = await Alert.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
          // order: 'id desc'
        },
      ],
    });
    // Serialize data so the template can read it
    const alerts = alertData.map((alert) => alert.get({ plain: true }));
    // Pass serialized data and session flag into template
    // console.log('alerts', alerts);
    res.render('homepage', {
      alerts,
      loggedIn: req.session.loggedIn,
      userID: req.session.user_id,
      closed_price: req.session.closed_price,
      // user_id: req.session.user_id,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//get the login page from handlebars
routes.get('/login',async (req,res)=>{
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
})

//get the signup page from handlebars
routes.get('/signup',async (req,res)=>{
  res.render('signup')
})
routes.get('/alert', (req, res) => {
  res.render('createalert', {
    loggedIn: req.session.loggedIn,
  });
});
//view alert by id routes
routes.get('/alert/:id',withAuth, async (req, res) => {
  const alertData = await Alert.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      // {
      //   model: Comment,
      //   include: {
      //     model: User,
      //     attributes: ['username'],
      //   },
      // },
    ],
  });
// console.log( alertData)
  const alert = alertData.get({ plain: true });
  res.render('viewalert', {
    ...alert,
    canDelete: alert.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});

//get the profile page from handlebars
routes.get('/profile',withAuth, async (req,res)=>{
  res.render('profile')
})
//get profile information by id 
routes.get('/profile/:id',withAuth, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },

  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No username exit!.`,
        });
        return;
      }
      // else respond with results
      // res.json(results);
      // console.log(results);
      const ids = results.map((id) => id.get({ plain: true }));
      
      res.render('profile' , {
        ids,
        loggedIn: req.session.loggedIn,
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// //search alert by profile id 
// routes.get('/user/:id', (req, res) => {
//   Alert.findAll({
    
//     where: {
//       id: req.params.user_id,
//     },
//     include: { 
//       model: User,
//       attributes: ['username'],
//     }
    
//   })
//     .then((results) => {
//       // if no results, respond with 404 and inform user no results found for that ID
//       if (!results) {
//         res.status(404).json({
//           message: `No Alert ticter found!.`,
//         });
//         return;
//       }
//       // else respond with results
//       res.json(results);
//       const alerts = results.map((alert) => alert.get({ plain: true }));
//       // console.log(results);
//       res.render('profile' , {
//         alerts,
//         loggedIn: req.session.loggedIn,
//       })
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//search the by ticker routes
routes.get('/search/:ticker',withAuth, (req, res) => {
  Alert.findAll({
    
    where: {
      ticker: req.params.ticker,
    },
    include: { 
      model: User,
      attributes: ['username'],
    }
    
  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No Alert on ${req.params.ticker} ticter found!.`,
        });
        return;
      }
      // else respond with results
      // res.json(results);
      const tickers = results.map((ticker) => ticker.get({ plain: true }));
      // console.log(results);
      res.render('search' , {
        tickers,
        loggedIn: req.session.loggedIn,
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get the current price from yahoo
routes.get('/price', (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
      return res.status(404).send('Not found');
  }
  yahooFinance.quote({
      symbol: symbol,
      modules: ['financialData']
  }, (err, quotes) => {
      if (quotes && quotes.financialData && quotes.financialData.currentPrice) {
          res.send({
              symbol: symbol,
              price: quotes.financialData.currentPrice
          });
      } else {
          return res.status(404).send('Not found');
      }
  });
})
module.exports = routes;
