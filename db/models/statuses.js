'use strict';
module.exports = (sequelize, DataTypes) => {
  const statuses = sequelize.define('statuses', {
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
  statuses.associate = function(models) {
    // associations can be defined here
  };
  return statuses;
};