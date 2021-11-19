const { Op } = require('sequelize');
const { Edicion } = require("../models");

const existeEdicionPorId = async (id = '') => {
    const existe = await Edicion.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};

const uniqueEdicionPorIsbn = async (isbn, {req}) => {
    // tambien puedo tomar el body con todos lo que envie el formulario
    const {params, method } = req;
    let existe =  null;
    if (method === 'POST') {
        existe = await Edicion.findOne({where: {isbn}});
    }
    if (method === 'PUT') {
        const {id} = params;
        if (id) {
            existe = await Edicion.findOne({where: [{isbn, id: {[Op.ne]: id } }] });
        }
    }
    if (existe) {
        throw new Error(`El isbn: ${isbn} ya esta en uso`);
    }
}

module.exports = {
    existeEdicionPorId,
    uniqueEdicionPorIsbn,
};