'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_tasks', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: "index",
        references: {
          model: "users",
          key: "id"
        }
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: "index",
        references: {
          model: "tasks",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        user_task_tag: {
          customIndex: true,
          fields: ["user_id", "task_id"]
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_tasks');
  }
};