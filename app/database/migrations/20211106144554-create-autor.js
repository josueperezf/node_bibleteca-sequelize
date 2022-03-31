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
        type: Sequelize.DATE,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('autors');
  }
};