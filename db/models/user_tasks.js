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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    freezeTableName: false,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  user_tasks.associate = function(models) {
    // associations can be defined here
  };
  return user_tasks;
};