'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('copias_prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      copia_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'copias',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      prestamo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'prestamos',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        default: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('copias_prestamos');
  }
};