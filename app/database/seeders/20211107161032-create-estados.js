'use strict';

module.exports = {
  // se ejecuta al hacer la siembra 'seed'
  up: async (queryInterface, Sequelize) => {
    // nombre de la tabla no del modelo
     await queryInterface.bulkInsert('estados', [
       {nombre: 'DISPONIBLE', estatus: 1},
       {nombre: 'PRESTADO',   estatus: 1},
       {nombre: 'EXTRAVIADO', estatus: 1},
       {nombre: 'DESUSO',     estatus: 1},
       {nombre: 'ELIMINADO',  estatus: 1},
    ], {});
    
  },
  // se ejecuta cuando se deshace la siembra
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('estados', null, {});
  }
};
