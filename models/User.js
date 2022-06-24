// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// import our database connection from config.js
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// set up fields and rules for User model
User.init ({
    //define cloumns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
         allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
      },
    },

},
{
    hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: (newUserData) => {
          newUserData.password = bcrypt.hashSync(newUserData.password, 10);
          return newUserData;
        },
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;