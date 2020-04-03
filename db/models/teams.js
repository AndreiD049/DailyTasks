'use strict';
module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define('teams', {
    name: {
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
  teams.associate = function(models) {
    // associations can be defined here
    teams.hasMany(models["users"], {
      foreignKey: "team_id",
      allowNull: true,
    });
    models["users"].belongsTo(teams, {
      foreignKey: "team_id",
      allowNull: true
    })
  };
  return teams;
};