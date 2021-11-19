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
      persona_id: {
        type: Sequelize.INTEGER,
        unique : true,
        references: {
          model: {
            tableName: 'personas',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
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