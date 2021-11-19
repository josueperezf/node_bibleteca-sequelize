const { Op } = require('sequelize');
const { Copia, CopiaPrestamo } = require("../models");

const existeCopiaPorId = async (id = '') => {
    const existe = await Copia.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};


// prestamo, copias disponibles para prestar
const disponiblesTodasLasCopiasPorId = async (copias = [], {req} ) => {
    // con la siguiente linea limpio las id, quitando los que esten repetidos
    const ids = [...new Set(copias)];
    const {params, method, body } = req;
    let existe =  null;
    if (method === 'POST') {
        if (copias.length === 0) {
            throw new Error(`Copias no estan disponibles, verifique`);
        }
        existe = await Copia.findAndCountAll({where: [{id: {[Op.in]: ids } }, {'estado_id':1}] });
        if (existe?.count !== ids.length) {
            throw new Error(`Copias no disponibles, verifique si alguna de las copias ya han sido prestadas`);
        }
    }
    
    if (method === 'PUT') {
        const {id} = params;
        const copiasDevueltas = [...new Set(req.body.copiasDevueltas)];
        const copiasExtraviadas = [...new Set(req.body.copiasExtraviadas)];
        const totalCopiasProcesarSinDistint = [... copiasDevueltas, ...copiasExtraviadas];
        const totalCopiasProcesarDistint = new Set([... copiasDevueltas, ...copiasExtraviadas]);
        if(
            (!id)
            || ( totalCopiasProcesarDistint === 0 )
            || (totalCopiasProcesarSinDistint.length !== totalCopiasProcesarDistint.size)
          ) {
            throw new Error(`No existen los datos minimos requeridos, verifique`);
        }
        existe = await CopiaPrestamo.findAndCountAll({where: [{prestamo_id: id}, {copia_id: totalCopiasProcesarSinDistint} ] });
        if (existe?.count !== totalCopiasProcesarDistint.size ) {
            throw new Error(`Copias no disponibles, verifique si alguna de las copias ya han sido prestadas`);
        }
    }
};

module.exports = {
    existeCopiaPorId,
    disponiblesTodasLasCopiasPorId
};