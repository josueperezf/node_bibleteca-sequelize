'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tipo_usuarios',
    [
      {nombre:"ADMINISTRADOR", estatus:1},
      {nombre:"OPERADOR", estatus:1}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tipo_usuarios', null, {});
  }
};
