'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('idiomas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      estatus: {
        type: Sequelize.INTEGER,
        default:1
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('idiomas');
  }
};