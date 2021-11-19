const { Libro } = require("../models");

const existeLibroPorId = async (id = '') => {
    const existe = await Libro.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};

module.exports = {
    existeLibroPorId
};