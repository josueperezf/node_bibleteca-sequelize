'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('autores', {
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
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY, // DATEONLY es fecha, date es timestamp, 
        allowNull: false,
      },
      biografia: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('autors');
  }
};