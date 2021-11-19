const { response, request } = require("express");
const { Persona, Pais, Edicion, Idioma, Libro, Autor} = require("../models");

const indexEdicion = async (req = request, res=response) => {
    const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
    // where = {} listaria todo, seria un where sin condicion
    const estatus = (estado != 1 ) ? 0 : 1;
    const where = (todos) ? {} : {estatus};
    const include = [
        {model: Idioma, as: 'idioma'},
        {model: Libro, as: 'libro'},
    ];
    const order = [
        ['id', 'DESC'],
        // ['name', 'ASC'],
    ];
    const [ediciones, total ] = await Promise.all([
       (todos)
        ? Edicion.scope({ method: ['buscar', query] }).findAll({ include, order})
        : Edicion.scope({ method: ['buscar', query] }).findAll({where, include, limit: parseInt(limit), offset: parseInt(offset), order}),
        Edicion.scope({ method: ['buscar', query] }).count({where})
    ]);
    return res.json({
        ediciones,
        total
    });
}

const storeEdicion = async (req = request, res=response) => {
    const { idioma_id, libro_id, nombre, fecha, isbn, numero_paginas, tipo = 1 }  = req.body;
    try {
        const data = {idioma_id, libro_id, nombre, fecha, isbn, numero_paginas, tipo };
        const edicion = await Edicion.create(data);
        res.status(201).json({
            ok: true,
            edicion,
            msg: `Operación exitosa`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador',
        });
    }
}

const showEdicion = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
        {model: Idioma, as: 'idioma'},
        {
            model: Libro, as: 'libro',
            include: [
                {
                    model: Autor, as: 'autores',
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            include: [{model: Pais, as: 'pais'}]
                        }
                    ]
                }
            ]
        },
    ];
    const edicion = await Edicion.findByPk(id,{include});
    res.status(200).json({
        ok: true,
        edicion
    });
}

const updateEdicion = async (req, res=response) => {
    const { id }   = req.params;
    const { idioma_id, libro_id, nombre, fecha, isbn, numero_paginas, tipo = 1 }  = req.body;
    const data = { idioma_id, libro_id, nombre, fecha, isbn, numero_paginas, tipo };
    try {
        const edicion = await Edicion.findByPk(id);
        await edicion.update(data);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            edicion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const destroyEdicion = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const edicion = await Edicion.findByPk(id);
        await edicion.update({ estatus: 0 });
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            edicion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }
}

module.exports = {
    indexEdicion,
    storeEdicion,
    showEdicion,
    updateEdicion,
    destroyEdicion
};