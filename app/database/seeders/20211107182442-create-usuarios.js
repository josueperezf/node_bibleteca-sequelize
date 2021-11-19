'use strict';
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);
let password = '123456';
password = bcryptjs.hashSync(password,salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios',
    [
      {tipo_usuario_id:1, persona_id:1, login: "josueperezf@gmail.com", password , estatus:1}
    ]
    , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
