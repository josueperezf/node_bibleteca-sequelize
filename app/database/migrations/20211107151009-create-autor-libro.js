'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('autores_libros', {
      libro_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      autor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('autores_libros');
  }
};