'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checklist_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tasks',
          key: 'id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_task_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user_tasks',
          key: 'id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('checklist_items');
  }
};