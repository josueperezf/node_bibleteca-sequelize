'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('personas', [
      {pais_id:192, dni:"18419040", nombre: "JOSUE YOEL PEREZ", direccion :"PREGONERO", telefono:"", fecha_nacimiento:"1986-07-02", estatus :1},
    ]

    , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('personas', null, {});
  }
};
