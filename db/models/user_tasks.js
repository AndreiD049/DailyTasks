'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_tasks = sequelize.define('user_tasks', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } 
  }, {
    freezeTableName: false
  });
  user_tasks.associate = function(models) {
    // associations can be defined here
  };
  return user_tasks;
};