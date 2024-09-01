const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));

  User.associate(sequelize.models);
}

module.exports = setupModels;
