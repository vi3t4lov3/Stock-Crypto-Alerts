const User = require('../models/User');

const userSeeds = [
  {
		"id": 1,
		"username": "Colin",
		"password": "password12345",
		"email": "testing1@testing.com"
	},
	{
		"id": 2,
		"username": "Charnay",
		"password": "password12345",
		"email": "testing2@testing.com"
	},
	{
		"id": 3,
		"username": "WillNguyen",
		"password": "$2b$10$oyr.Zfoh5k.eUPS2ZtwxXesYSoqrfJSD0d63IhbDXUeEp6TC.LsuK",
		"email": "tuinfor@ymail.com"
	},
	{
		"id": 4,
		"username": "Harris",
		"password": "password12345",
		"email": "testing3@testing.com"
	},
];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;
