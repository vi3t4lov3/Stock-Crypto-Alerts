// initialize all required packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// const twilio = require('twilio');

const yahooFinance = require('yahoo-finance');
const { QueryTypes } = require('sequelize')


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // maxAge: 3600,
    // httpOnly: false,
    // secure: false,
    // sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server Now listening Port ${PORT}`));
});

// app.listen(PORT, () => console.log('Now listening'));


// function to update db ticker prices with live quotes
async function dbPriceUpdate() {
  var tickerList = [];
  var priceList = [];
  
  // query db for all tickers
  const tickersObj = await sequelize.query("SELECT ticker FROM alert", { type: QueryTypes.SELECT})

  console.log('\x1b[33m%s\x1b[0m', "Querying database for tickers...")

  // add tickers from query to array to be used by scraper package
  for (let i = 0; i < tickersObj.length; i++) {
    console.log(tickersObj[i].ticker)
    tickerList.push(tickersObj[i].ticker)
  }
  
  console.log(tickerList)
  console.log('\x1b[33m%s\x1b[0m', "Scraping current ticker price quotes...")

  // use yahoo-finance package to scrape live quote data from ticker array and push to price array
  for (let j=0; j < tickerList.length; j++) {
    var yf = await yahooFinance.quote(tickerList[j], ['price'])
    console.log(yf.price.regularMarketPrice)
    priceList.push(yf.price.regularMarketPrice)
  }

  console.log(priceList)
  console.log('\x1b[33m%s\x1b[0m', "Updating database...")

  // update db with new prices
  for (let k=0; k < tickerList.length; k++) {
    await sequelize.query(("UPDATE alert SET current_price = " + priceList[k] + " WHERE ticker = '" + tickerList[k] + "'"), { type: QueryTypes.UPDATE})
  }

  console.log('\x1b[33m%s\x1b[0m', "Database updated, resetting scraper timer...")
}


// timer interval for every X minutes to run the query, scrape, & update function above 
var minutesLeft = 2
function runTimer() {
  console.log('\x1b[33m%s\x1b[0m', minutesLeft + " minutes before ticker price quotes are updated...")
  var timerInterval = setInterval(function() {
    minutesLeft--;
    console.log('\x1b[33m%s\x1b[0m', minutesLeft + " minutes before ticker price quotes are updated...")
  
    if(minutesLeft <=0) {
        dbPriceUpdate()
        clearInterval(timerInterval)
        minutesLeft = 2
        // self-referencing function for continuous looping
        runTimer()
    }
  }, 60000) // 60000ms for a 1 minute interval
}

// initialize first run of interval
runTimer()