const { response, request } = require("express");
const {Idioma} = require("../models");

const indexIdioma = async (req = request, res = response) => {
    const order = [['nombre', 'DESC']];
    const idiomas = await Idioma.findAll({ order });
    return res.json({
        ok: true,
        idiomas,
    });
}

module.exports = {
    indexIdioma,
};