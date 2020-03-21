'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'birth_date'
    },
    employmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'employment_date'
    }
  }, {
    freezeTableName: true
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};