'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'birth_date'
    },
    employment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'employment_date'
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
  users.associate = function(models) {
    users.belongsToMany(models["tasks"], {
      through: "user_tasks",
      foreignKey: "user_id"
    });
  };
  return users;
};