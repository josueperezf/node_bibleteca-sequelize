const { response, request } = require("express");
const { Persona} = require("../models");

const index = async (req = request, res=response) => {
    // parametros que puedan pasar, ejemplo ?pag=2 etc
    /**
     * la variable 'estado' es para listar todas las personas,
     * puede tener tres valores
     * 1) 'undefined' para cuando el frontend no envio el parametro, alli listara lo que diga el limit si tiene
     * 2) '1' para que liste estado los activos
     * 3) '0' para que liste estado estatus 0 
     * 4) '2' para que liste a estado los estatus
     */
    const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
    // where = {} listaria todo, seria un where sin condicion
    const estatus = (estado != 1 ) ? 0 : 1;
    const where = (todos) ? {} : {estatus};
    const order = [
        ['id', 'DESC'],
        // ['name', 'ASC'],
    ];
    const [personas, total ] = await Promise.all([
       (todos)
        ? Persona.scope({ method: ['buscar', query] }).findAll({ order})
        : Persona.scope({ method: ['buscar', query] }).findAll({where, limit: parseInt(limit), offset: parseInt(offset), order}),
        Persona.scope({ method: ['buscar', query] }).count({where})
    ]);
    return res.json({
        personas,
        total
    });
}

const store = async (req = request, res=response) => {
    const { dni, nombre, direccion, fecha_nacimiento, telefono = ''}  = req.body;
    try {
        
        const data = {dni, nombre, direccion, fecha_nacimiento, telefono};
        const persona = await Persona.create(data);
        // await persona.save();
        res.status(201).json({
            ok: true,
            persona,
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

const show = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
            // {model: Pais, as: 'pais'}
        ];
    const persona = await Persona.findByPk(id,{include});
    res.status(200).json({
        ok: true,
        persona
    });
}

const update = async (req, res=response) => {
    const { id }   = req.params;
    const {dni, nombre, direccion, fecha_nacimiento, telefono = ''}  = req.body;
    const data = { id, dni, nombre, direccion, fecha_nacimiento, telefono};
    try {
        const persona = await Persona.findByPk(id);
        await persona.update(data);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const destroy = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const persona = await Persona.findByPk(id);
        await persona.update({ estatus: 0 });
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            persona
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
    index,
    store,
    show,
    update,
    destroy
};