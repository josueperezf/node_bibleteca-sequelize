const { Op } = require('sequelize');
const { Autor } = require("../models");

const existeAutorPorId = async (id = '') => {
    const existe = await Autor.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};

const uniqueAutorPorPersonaId = async (persona_id, {req}) => {
    // tambien puedo tomar el body con todos lo que envie el formulario
    const {params, method } = req;
    let existe =  null;
    const include = [
        {model: Persona, as: 'persona' },
    ];
    if (method === 'POST') {
        existe = await Autor.findOne({include, where: {persona_id}});
    }
    if (method === 'PUT') {
        const {id} = params;
        if (id) {
            existe = await Autor.findOne({where: [{persona_id, id: {[Op.ne]: id } }] });
        }
    }
    if (existe) {
        const {persona} = existe;
        throw new Error(`La persona: ${persona.nombre || persona_id } ya esta registrada como autor`);
    }
}

const existeTodosLosAutoresPorId = async (autores = [] ) => {
    const ids = [...new Set(autores)];
    const existe = await Autor.findAndCountAll({where: [{id: {[Op.in]: ids } }] });
    if (autores.length === 0) {
        throw new Error(`Autores no disponibles, verifique`);
    }
    
    if (ids.length ===0 || existe.count !== ids.length) {
        throw new Error(`Autores no disponibles, verifique`);
    }
};


module.exports = {
    existeAutorPorId,
    uniqueAutorPorPersonaId,
    existeTodosLosAutoresPorId
};