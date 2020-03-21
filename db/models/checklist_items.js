'use strict';
module.exports = (sequelize, DataTypes) => {
  const checklist_items = sequelize.define('checklist_items', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_task_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });
  checklist_items.associate = function(models) {
    // define relationship with 'tasks' table (checklist item is related to one task)
    models["tasks"].hasMany(checklist_items, {
      foreignKey: "task_id",
      onDelete: "CASCADE"
    });
    checklist_items.belongsTo(models["tasks"], {
      foreignKey: "task_id"
    });
    // define relationship with 'user_tasks' table. via 'user_task_id' to 'id'
    models["user_tasks"].hasMany(checklist_items, {
      foreignKey: "user_task_id",
      onDelete: "CASCADE"
    });
    checklist_items.belongsTo(models["user_tasks"], {
      foreignKey: "user_task_id"
    });
  };
  return checklist_items;
};