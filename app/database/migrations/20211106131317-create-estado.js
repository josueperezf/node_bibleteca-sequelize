'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(80)
      },
      estatus: {
        type: Sequelize.INTEGER,
        default: 1
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estados');
  }
};