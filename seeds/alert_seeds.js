const Alert = require('../models/Alert');

const alertSeeds = [
  {
		"id": 1,
		"ticker": "AAPL",
		"entry": "LONG",
		"close_entry": "0",
		"entry_price": 150.50,
		"target": 200.50,
		"stoploss": 130,
		"status": "OPEN",
		"closed_price": 0,
		"user_id": 1,
		"createdAt": "2022-06-14T22:21:27.000Z",
		"updatedAt": "2022-06-14T22:21:27.000Z"
	},
	{
		"id": 2,
		"ticker": "AMZN",
		"entry": "SHORT",
		"close_entry": "0",
		"entry_price": 135.56,
		"target": 140.45,
		"stoploss": 100.00,
		"status": "OPEN",
		"closed_price": 0,
		"user_id": 2,
		"createdAt": "2022-06-14T22:21:27.000Z",
		"updatedAt": "2022-06-14T22:21:27.000Z"
	},
	{
		"id": 3,
		"ticker": "AMZN",
		"entry": "SHORT",
		"close_entry": "BUY TO CLOSE",
		"entry_price": 140.50,
		"target": 200.00,
		"stoploss": 55.50,
		"status": "CLOSED",
		"closed_price": 120.00,
		"profit_or_loss": 14.59,
		"user_id": 4,
		"createdAt": "2022-06-14T22:21:27.000Z",
		"updatedAt": "2022-06-14T22:21:27.000Z"
	},
	{
		"id": 4,
		"ticker": "AAPL",
		"entry": "LONG",
		"close_entry": "SELL TO CLOSE",
		"entry_price": 150.00,
		"target": 200.00,
		"stoploss": 140.00,
		"status": "CLOSED",
		"closed_price": 210.00,
		"profit_or_loss": 40.00,
		"user_id": 3,
		"createdAt": "2022-06-14T22:22:19.000Z",
		"updatedAt": "2022-06-14T22:28:56.000Z"
	},
	{
		"id": 5,
		"ticker": "AAPL",
		"entry": "LONG",
		"close_entry": "SELL TO CLOSE",
		"entry_price": 140,
		"target": 145,
		"stoploss": 135,
		"status": "CLOSED",
		"closed_price": 146,
		"profit_or_loss": 4.29,
		"user_id": 3,
		"createdAt": "2022-06-14T22:28:10.000Z",
		"updatedAt": "2022-06-14T23:25:32.000Z"
	},
	{
		"id": 7,
		"ticker": "SPY",
		"entry": "LONG",
		"close_entry": "SELL TO CLOSE",
		"entry_price": 400.00,
		"target": 450.00,
		"stoploss": 350.00,
		"status": "CLOSED",
		"closed_price": 440.00,
		"profit_or_loss": 10.00,
		"user_id": 3,
		"createdAt": "2022-06-15T03:56:53.000Z",
		"updatedAt": "2022-06-15T04:15:16.000Z"
	},
	{
		"id": 8,
		"ticker": "NFLX",
		"entry": "SHORT",
		"close_entry": "SELL TO CLOSE",
		"entry_price": 407.46,
		"target": 200.00,
		"stoploss": 500.00,
		"status": "CLOSED",
		"closed_price": 180.34,
		"profit_or_loss": 55.74,
		"user_id": 3,
		"createdAt": "2022-06-15T04:15:45.000Z",
		"updatedAt": "2022-06-15T04:20:15.000Z"
	},
	{
		"id": 9,
		"ticker": "QQQ",
		"entry": "LONG",
		"close_entry": "0",
		"entry_price": 454.00,
		"target": 460.00,
		"stoploss": 400.00,
		"status": "OPEN",
		"closed_price": 0,
		"profit_or_loss": null,
		"user_id": 3,
		"createdAt": "2022-06-15T04:22:39.000Z",
		"updatedAt": "2022-06-15T04:22:39.000Z"
	},
	{
		"id": 10,
		"ticker": "AAPL",
		"entry": "LONG",
		"close_entry": "0",
		"entry_price": 150.00,
		"target": 170.00,
		"stoploss": 140.00,
		"status": "OPEN",
		"closed_price": 0,
		"profit_or_loss": null,
		"user_id": 3,
		"createdAt": "2022-06-15T04:49:25.000Z",
		"updatedAt": "2022-06-15T04:49:25.000Z"
	},
	{
		"id": 11,
		"ticker": "QQQ",
		"entry": "SHORT",
		"close_entry": "BUY TO CLOSE",
		"entry_price": 453.00,
		"target": 470.00,
		"stoploss": 400.00,
		"status": "CLOSED",
		"closed_price": 500.00,
		"profit_or_loss": 10.37,
		"user_id": 3,
		"createdAt": "2022-06-15T04:53:10.000Z",
		"updatedAt": "2022-06-15T05:03:31.000Z"
	}
  
];

const seedAlerts = () => Alert.bulkCreate(alertSeeds);

module.exports = seedAlerts;