'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('teams', [
        {
          name: 'Exxon',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Dow',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Chevron',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'HD',
          created_at: new Date(),
          updated_at: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('teams', null, {});
  }
};
