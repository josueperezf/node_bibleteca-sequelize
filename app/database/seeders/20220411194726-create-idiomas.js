'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('idiomas', [
      {nombre: "INGLÉS​", estatus: 1},
      {nombre: "CHINO MANDARÍN​", estatus: 1},
      {nombre: "HINDI​", estatus: 1},
      {nombre: "ESPAÑOL​", estatus: 1},
      {nombre: "FRANCÉS​", estatus: 1},
      {nombre: "ÁRABE​", estatus: 1},
      {nombre: "BENGALÍ​", estatus: 1},
      {nombre: "RUSO​", estatus: 1},
      {nombre: "PORTUGUÉS​", estatus: 1},
      {nombre: "URDU​", estatus: 1},
      {nombre: "INDONESIO​", estatus: 1},
      {nombre: "ALEMÁN​", estatus: 1},
      {nombre: "JAPONÉS​", estatus: 1},
      {nombre: "MARATÍ​", estatus: 1},
      {nombre: "TELUGÚ​", estatus: 1},
      {nombre: "TURCO​", estatus: 1},
      {nombre: "CHINO CANTONÉS​", estatus: 1},
      {nombre: "VIETNAMITA​", estatus: 1},
      {nombre: "TAMIL​", estatus: 1},
      {nombre: "CHINO WU​", estatus: 1},
      {nombre: "COREANO​", estatus: 1},
      {nombre: "PERSA IRANÍ​", estatus: 1},
      {nombre: "HAUSA​", estatus: 1},
      {nombre: "ÁRABE EGIPCIO​", estatus: 1},
      {nombre: "SUAJILI​", estatus: 1},
      {nombre: "JAVANÉS​", estatus: 1},
      {nombre: "ITALIANO​", estatus: 1},
      {nombre: "PANYABÍ OCCIDENTAL​", estatus: 1},
      {nombre: "GUYARATI​", estatus: 1},
      {nombre: "TAILANDÉS​", estatus: 1},
      {nombre: "AMÁRICO​", estatus: 1},
      {nombre: "CANARÉS​", estatus: 1},
      {nombre: "CHINO MǏN NÁN​", estatus: 1}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('idiomas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
