const { Pais } = require("../models");

const existePaisActivoPorId = async (id = '') => {
    const existe = await Pais.findOne({where: {id,estatus:1}} );
    if (!existe) {
        throw new Error(`Pais no disponible`);
    }
};

module.exports = {
    existePaisActivoPorId
};