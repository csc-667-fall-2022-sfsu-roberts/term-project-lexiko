const tiles = require("../config/tiles");

const {rawTileList} = tiles;
'use strict';
/** @type {import('sequelize-cli).Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tiles',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        points: {
          type: Sequelize.INTEGER,
        },
        letter: {
          type: Sequelize.CHAR,
        }
      }
    );
    let id = 0;
    let GENERATED_TILES = [];

    rawTileList.forEach((element) => {
      let points = element.points;
      let letter = element.letter;
      for (let i = 0; i < element.count; i++) {
        GENERATED_TILES.push({id, points, letter})
        id += 1;
        // console.log(letter)
      }
    });
    await queryInterface.bulkInsert('tiles', GENERATED_TILES);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tiles');
  },
};