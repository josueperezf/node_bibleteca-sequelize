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
      pais_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'paises',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
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
        type: Sequelize.DATE,
        allowNull: false,
      },
      estatus: {
        type: Sequelize.INTEGER,
        default: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personas');
  }
};