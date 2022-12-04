'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game_users',
      {
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        seat: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        current: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_users');
  }
};