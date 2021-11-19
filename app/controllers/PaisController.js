const { response, request } = require("express");
const { Pais, Persona } = require("../models");

const indexPais = async (req = request, res = response) => {
    const {relacion = 0} = req.query;
    const order = [['nombre', 'DESC']];
    const include = (relacion == 0)? null : [{model: Persona, as: 'persona'}];
    const paises = await Pais.findAll({include, order });
    return res.json({
        ok: true,
        paises,
    });
}

module.exports = {
    indexPais,
};