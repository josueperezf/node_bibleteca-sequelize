const { Op } = require('sequelize');
const { Persona } = require("../models");

const existePersonaPorId = async (id = '') => {
    const existe = await Persona.findByPk(id);
    if (!existe) {
        throw new Error(`404, Persona no encontrada`);
    }
};

const existePersonaActivaPorId = async (id = '') => {
    // console.log({id});
    const existe = await Persona.findOne({where: {id,estatus:1}} );
    // console.log({existe});
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB para un usuario valido`);
    }
};

const existePersonaActivaPorDNI = async (dni = '') => {
    const existe = await Persona.findOne({where: {dni,estatus:1}} );
    if (!existe) {
        throw new Error(`El RUT no existe o no esta disponible`);
    }
};

const uniquePersonaPorDNi = async (dni, {req}) => {
    // tambien puedo tomar el body con todos lo que envie el formulario
    const {params, method } = req;
    let existe =  null;
    if (method === 'POST') {
        existe = await Persona.findOne({where: {dni}});
    }
    if (method === 'PUT') {
        const {id} = params;
        if (id) {
            existe = await Persona.findOne({where: [{dni, id: {[Op.ne]: id } }] });
        }
    }
    if (existe) {
        throw new Error(`El DNI: ${dni} ya esta en uso`);
    }
}


module.exports = {
    existePersonaActivaPorDNI,
    existePersonaActivaPorId,
    existePersonaPorId,
    uniquePersonaPorDNi
};