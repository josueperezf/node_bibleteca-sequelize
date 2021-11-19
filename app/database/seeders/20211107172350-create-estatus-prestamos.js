'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('estatus_prestamos', [
      {nombre:"PRESTADO", estatus:1},
      {nombre:"ENTREGA PARCIAL", estatus:1},
      {nombre:"ENTREGA TOTAL", estatus:1},
      {nombre:"ENTREGA TOTAL CON PERDIDA", estatus:1},
      {nombre:"PERDIDA TOTAL", estatus:1},
      {nombre:"ENTREGA PARCIAL CON PERDIDA", estatus:1}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('estatus_prestamos', null, {});
  }
};
