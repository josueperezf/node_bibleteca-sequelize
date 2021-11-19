'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      estatus: {
        type: Sequelize.INTEGER,
        default: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('libros');
  }
};