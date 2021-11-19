'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estatus_prestamo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'estatus_prestamos',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
      },
      persona_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'personas',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
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
    await queryInterface.dropTable('prestamos');
  }
};