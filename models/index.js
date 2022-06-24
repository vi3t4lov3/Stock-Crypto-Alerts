const User = require('./User');
const Alert = require('./Alert');
const Comment = require('./Comment');

Alert.belongsTo(User, {
  foreignKey: 'user_id'
})

// User.hasMany(Alert, {
//   foreignKey: 'user_id'
// });
// Alert.belongsToMany(User, {
//   foreignKey: 'user_id'
// })
// User.hasMany(Comment, {
//   foreignKey: 'user_id'
// });
// Comment.belongsToMany(User, {
//   foreignKey: 'user_id'
// })
// Alert.hasMany(Comment, {
//   foreignKey: 'alert_id'
// })
// Comment.belongsToMany(Alert, {
//   foreignKey: 'alert_id'
// })



module.exports = { 
  User,
  Alert,
  Comment };