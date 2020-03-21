'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_credentials = sequelize.define('user_credentials', {
    user_id: DataTypes.INTEGER,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user_credentials.associate = function(models) {
    // associations can be defined here
  };
  return user_credentials;
};