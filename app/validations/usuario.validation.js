const { Op } = require('sequelize');
const { Usuario, Persona } = require('../models');

const uniquePersonaPorUsuarioId = async (persona_id, {req}) => {
    // tambien puedo tomar el body con todos lo que envie el formulario
    const {params, method } = req;
    let existe =  null;
    const include = [
        {model: Persona, as: 'persona' },
    ];
    if (method === 'POST') {
        existe = await Usuario.findOne({include, where: {persona_id}});
    }
    if (method === 'PUT') {
        const {id} = params;
        if (id) {
            existe = await Usuario.findOne({where: [{persona_id, id: {[Op.ne]: id } }] });
        }
    }
    if (existe) {
        const {persona} = existe;
        throw new Error(`La persona: ${persona.nombre || persona_id } ya posee cuenta de usuario`);
    }
}
const uniqueLogin = async (login, {req}) => {
    // tambien puedo tomar el body con todos lo que envie el formulario
    const {params, method } = req;
    let existe =  null;
    if (method === 'POST') {
        existe = await Usuario.findOne({where: {login}});
    }
    if (method === 'PUT') {
        const {id} = params;
        if (id) {
            existe = await Usuario.findOne({where: [{login, id: {[Op.ne]: id } }] });
        }
    }
    if (existe) {
        throw new Error(`El login o correo  ya esta en uso`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existe = await Usuario.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};

module.exports = {
    existeUsuarioPorId,
    uniqueLogin,
    uniquePersonaPorUsuarioId,
};