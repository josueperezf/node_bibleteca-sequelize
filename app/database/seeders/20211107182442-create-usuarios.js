'use strict';
const bcryptjs = require('bcryptjs');
const sequelize = require('sequelize');
const salt = bcryptjs.genSaltSync(10);
let password = '123456';
password = bcryptjs.hashSync(password,salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios',
    [
      {tipo_usuario_id:1, persona_id:1, login: "josueperezf@gmail.com", password , estatus:1, created_at: sequelize.fn('NOW'), updated_at: sequelize.fn('NOW')}
    ]
    , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
