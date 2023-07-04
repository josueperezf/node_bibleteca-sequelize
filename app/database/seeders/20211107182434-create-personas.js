'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('personas', [
      {dni:"26.802.417-4", nombre: "JOSUE YOEL PEREZ", direccion :"PREGONERO", telefono:"", fecha_nacimiento:"1986-07-02", estatus :1, created_at: sequelize.fn('NOW'), updated_at: sequelize.fn('NOW')},
    ]

    , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('personas', null, {});
  }
};
