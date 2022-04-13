const { response, request } = require("express");
const { Pais, Persona, Libro, Autor, Edicion, Idioma, AutorLibro } = require("../models");

const indexLibro = async (req = request, res = response) => {
    const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
    const order = [['id', 'DESC']];
    const estatus = (estado != 1 ) ? 0 : 1;
    const where = (todos) ? {} : {estatus};
    // const libros = await Libro.findAll({include, order });
    const [libros, total ] = await Promise.all([
        (todos)
         ? Libro.scope({ method: ['buscar', query] }).findAll({ order})
         : Libro.scope({ method: ['buscar', query] }).findAll({where, limit: parseInt(limit), offset: parseInt(offset), order}),
        Libro.scope({ method: ['buscar', query] }).count({where})
     ]);
    return res.json({
        ok: true,
        libros,
        total
    });
}
// get libros por autor
const getLibrosPorAutor = async (req = request, res = response) => {
    const {autor_id: id} =  req.params;
    const include = [
        {
            model: Libro, as: 'libros',
            attributes: ['id', 'titulo', 'estatus']
        },
    ];
    const autor = await Autor.findByPk(id, {include});
    const libros = autor?.libros.map(({dataValues:{id, titulo, estatus}}) => ({id, titulo, estatus}) ) || [];
    return  res.status(200).json({
        ok: true,
        libros,
        total: libros.length 
    });
}

const storeLibro = async (req = request, res=response) => {
    const { titulo }  = req.body;
    const autores = [...new Set(req.body.autores)];
    try {
        const libro = await Libro.create({titulo});
        // setAutores es un metodo de sequelize, lo crea debido a que tenemos relacionados ambos models
        // con la siguiente linea guardamos en la tabla relacional, el metodo set se puede usar tanto para insertar como para modificar
        await libro.setAutores(autores);
        res.status(201).json({
            ok: true,
            libro,
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
const showLibro = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
        {
            model: Autor, as: 'autores',
            include: [{model: Pais, as: 'pais'}]
        },
        {
            model: Edicion, as: 'ediciones',
            include: [
                {
                    model: Idioma,
                    as: 'idioma',
                }
            ]
        }
    ];
    const libro = await Libro.findByPk(id, {include });
    res.status(200).json({
        ok: true,
        libro
    });
}

const editLibro = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
        {
            model: Autor, as: 'autores',
            attributes: ['id', 'nombre']
        }
    ];
    const libro = await Libro.findByPk(id, {include });
    res.status(200).json({
        ok: true,
        libro
    });
}

const updateLibro = async (req, res=response) => {
    const { id }   = req.params;
    const {titulo}  = req.body;
    const autores = [...new Set(req.body.autores)];
    try {
        const libro = await Libro.findByPk(id);
        await libro.update({titulo});
        // setAutores es un metodo de sequelize, lo crea debido a que tenemos relacionados ambos models
        // con la siguiente linea guardamos en la tabla relacional, el metodo set se puede usar tanto para insertar como para modificar
        await libro.setAutores(autores);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            libro
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}
const destroyLibro = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const libro = await Libro.findByPk(id);
        await libro.update({ estatus: 0 });
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            libro
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
    indexLibro,
    getLibrosPorAutor,
    storeLibro,
    showLibro,
    editLibro,
    updateLibro,
    destroyLibro
};