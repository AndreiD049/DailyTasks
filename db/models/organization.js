'use strict';
module.exports = (sequelize, DataTypes) => {
  const organizations = sequelize.define('organizations', {
    name: {
      type: DataTypes.STRING,
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
    },
  }, {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  organizations.associate = function(models) {
    // One to Many relationship (organisation has many teams)
    organizations.hasMany(models["users"], {
      foreignKey: "organization_id",
      allowNull: false,
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    models["users"].belongsTo(organizations, {
      foreignKey: "organization_id",
      allowNull: false,
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    })
  };
  return organizations;
};