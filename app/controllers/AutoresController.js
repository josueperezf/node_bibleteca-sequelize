const { response, request } = require("express");
const { Autor, Persona, Pais, Libro} = require("../models");

const indexAutor = async (req = request, res=response) => {
     const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
     // where = {} listaria todo, seria un where sin condicion
     const estatus = (estado != 1 ) ? 0 : 1;
     const where = (todos) ? {} : {estatus};
     const order = [['id', 'DESC']];
     
     const [autores, total ] = await Promise.all([
        (todos)
            ? Autor.scope({ method: ['buscar', query] }).findAll({ order})
            : Autor.scope({ method: ['buscar', query] }).findAll({where, limit: parseInt(limit), offset: parseInt(offset), order}),
        Autor.scope({ method: ['buscar', query] }).count({where})
     ]);
     return res.json({
        autores,
        total
     });
}

const showAutor = async (req = request, res=response) => {
    const {id} =  req.params;
    // {model: Libro, as: 'libros' }, le debo colocar el mismo alias 'libros' que le coloque cuando cree su relacion de muchos a muchos
    const include = [
        {model: Persona, as: 'persona', include: [ {model: Pais, as: 'pais'} ] },
        {model: Libro, as: 'libros' },
    ];
    // const persona = await Persona.findAll({include});
    const autor = await Autor.findByPk(id, {include});
    return  res.status(200).json({
        ok: true,
        autor
    });
}

const storeAutor = async (req = request, res=response) => {
    const { pais_id, nombre, fecha_nacimiento, biografia}  = req.body;
    try {
        const data = { pais_id, nombre, fecha_nacimiento, biografia};
        const autor = new Autor(data);
        await autor.save ();
        res.status(201).json({
            ok: true,
            autor,
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

const updateAutor = async (req, res=response) => {
    const { id }   = req.params;
    const { pais_id, nombre, fecha_nacimiento, biografia}  = req.body;
    const data = { pais_id, nombre, fecha_nacimiento, biografia};
    try {
        const autor = await Autor.findByPk(id);
        await autor.update(data);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            autor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const destroyAutor = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const autor = await Autor.findByPk(id);
        await autor.update({ estatus: 0 });
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            autor
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
    indexAutor,
    showAutor,
    storeAutor,
    storePersonaAutor,
    updateAutor,
    destroyAutor
};