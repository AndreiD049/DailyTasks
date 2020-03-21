'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  tasks.associate = function(models) {
    tasks.belongsToMany(models["users"], {
      through: "user_tasks",
      foreignKey: "task_id"
    });
  };
  return tasks;
};