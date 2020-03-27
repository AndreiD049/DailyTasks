'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
      {
        first_name: "John",
        last_name: "Doe",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Max",
        last_name: "Payne",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Andrei",
        last_name: "Dimitrascu",
        birth_date: new Date("1994-06-15"),
        employment_date: new Date("2016-10-10"),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "John",
        last_name: "Doe II",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "George",
        last_name: "Bush",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Adam",
        last_name: "Sandler",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Simple",
        last_name: "Usert",
        birth_date: new Date(),
        employment_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
