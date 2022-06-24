const sequelize = require('../config/connection');
const { User, Alert, Comment } = require('../models');

// const userData = require('./userData.json');
// const alertData = require('./alertData.json');
// const commentData = require('./commentData.json');


// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const alert of alertData) {
//     await Alert.create({
//       ...alert,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();
const seedUsers = require('./user_seeds');
const seedAlert = require('./alert_seeds');
// const seedComment = require('./comment_seeds');

//Will seedall
const seedAll = async () => {
    await sequelize.sync({force:false});
    console.log(`DB SYNCED`);
    await seedUsers();
    console.log('USERS SEEDED');
    await seedAlert();
    console.log('ALERT SEEDED');
    // await seedComment();
    // console.log(`COMMENT SEEDED`);
    process.exit(0);
};

seedAll();