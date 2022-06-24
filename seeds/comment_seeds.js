const Comment = require('../models/Comment');

const commentSeeds = [
    {
        "comment": "testing testing",
      "alert_id": 1,
      "user_id" : 1
      }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;
