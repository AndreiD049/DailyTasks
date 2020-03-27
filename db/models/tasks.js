'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
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
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  tasks.associate = function(models) {
    tasks.belongsToMany(models["users"], {
      through: "user_tasks",
      foreignKey: "task_id"
    });
  };
  return tasks;
};