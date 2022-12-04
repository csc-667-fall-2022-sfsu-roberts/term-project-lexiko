'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game_tiles',
      {
        game_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        tile_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_tiles');
  }
};