'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dni: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique : true,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(200)
      },
      telefono: {
        type: Sequelize.STRING(12)
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      estatus: {
        type: Sequelize.INTEGER,
        default: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personas');
  }
};