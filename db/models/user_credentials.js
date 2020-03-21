'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_credentials = sequelize.define('user_credentials', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    freezeTableName: true
  });
  user_credentials.associate = function(models) {
    // associations can be defined here
    user_credentials.belongsTo(models["users"], {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
    models["users"].hasOne(user_credentials, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    })
  };
  return user_credentials;
};