'use strict';
module.exports = (sequelize, DataTypes) => {
  const statuses = sequelize.define('statuses', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    freezeTableName: true
  });
  statuses.associate = function(models) {
    // associations can be defined here
  };
  return statuses;
};