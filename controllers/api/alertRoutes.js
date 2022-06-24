const router = require('express').Router();
const { Comment, User, Alert, } = require('../../models');
const withAuth = require('../../utils/auth');
// Routes for '/api/alert
// get all alert
router.get('/', (req, res) => {
  Alert.findAll({})
    .then((results) => {
      res.json(results);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create an Alert
router.post('/', async (req, res) => {
  try {
    const newAlert = await Alert.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAlert);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get specific Alert/ Alert page
router.get('/:id',  (req, res) => {
  Alert.findOne({
    where: {
      id: req.params.id,
      // ticker: req.params.ticker,
    },
    
  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No Alert found with ID ${req.params.id} found. Please try again with a different ID.`,
        });
        return;
      }
      // else respond with results
      res.json(results);
      // const tickers = results.map((id) => id.get({ plain: true }));
      console.log(results)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// // get specific Alert/ Alert page
// router.get('/search/:ticker', (req, res) => {
//   Alert.findAll({
//     where: {
//       ticker: req.params.ticker,
//     },
    
//   })
//     .then((results) => {
//       // if no results, respond with 404 and inform user no results found for that ID
//       if (!results) {
//         res.status(404).json({
//           message: `No Alert on ${req.params.ticker} ticter yet!.`,
//         });
//         return;
//       }
//       // else respond with results
//       res.json(results);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


// delete an Alert by id
router.delete('/:id',withAuth, (req, res) => {
  Alert.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((results) => {
      // if there are no results, set status to 404 and inform user that ID is not found
      if (!results) {
        res.status(404).json({
          message: `No Alert with Id ${req.params.id} found. Please try again with different ID.`,
        });
        return;
      }
      // else, respond with results
      res.json({ message: 'Alert deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update an Alert (we using this to closed the alert)
router.put('/:id', withAuth, (req, res) => {
  Alert.update(
    {
      close_entry: req.body.close_entry,
      closed_price: req.body.closed_price,
      status: req.body.status,
      profit_or_loss: req.body.profit_or_loss,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    }
  )
  .then((results) => {
    res.json({
      message: 'Alert update successfully',
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;