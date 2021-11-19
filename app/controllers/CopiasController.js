const { response, request } = require("express");
const { Copia, Estado, Edicion, Idioma, Prestamo} = require("../models");

const indexCopia = async (req = request, res=response) => {
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
    /**
     * IMPORTANTE
     * 
     * al colocar el simbolor de dolar $ en el string, hago que sequelize no le asigne el alias,
     * sino que se lo agregaremos manualmente
     * en este ejemplo, como en el scope que creamos, llamado buscar, ya tengo el include a esta, 
     * pues directamente le coloco el estado.estatus
     */
    const estatus = (estado != 1 ) ? 0 : 1;
    const where = (todos) ? {} : {'$estado.estatus$': estatus};
    const order = [
        ['id', 'DESC'],
    ];
    // const copias = await Copia.scope({ method: ['buscar', query] }).findAll({});
    const [copias, total ] = await Promise.all([
       (todos)
        ? Copia.scope({ method: ['buscar', query] }).findAll({ order})
        : Copia.scope({ method: ['buscar', query] }).findAll({where, limit: parseInt(limit), offset: parseInt(offset), order}),
        Copia.scope({ method: ['buscar', query] }).count({where})
    ]);
    return res.json({
        copias,
        total
    });
}

const storeCopia = async (req = request, res=response) => {
    const { estado_id = 1, edicion_id, codigo, serial}  = req.body;
    try {
        const data = {estado_id, edicion_id, codigo, serial};
        const copia = await Copia.create(data);
        res.status(201).json({
            ok: true,
            copia,
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

const showCopia = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
        {model: Estado, as: 'estado'},
        {model: Prestamo, as: 'prestamos' },
        {
            model: Edicion, as: 'edicion',
            include: [
                /*
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
                */
                {
                    model: Idioma, as: 'idioma',
                }
            ]
        },
    ];
    const copia = await Copia.findByPk(id,{include});
    res.status(200).json({
        ok: true,
        copia
    });
}

const updateCopia = async (req, res=response) => {
    const { id }   = req.params;
    const { edicion_id, codigo, serial}  = req.body;
    const data = { edicion_id, codigo, serial};
    try {
        const copia = await Copia.findByPk(id);
        await copia.update(data);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            copia
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const destroyCopia = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const copia = await Copia.findByPk(id);
        await copia.update({ estado_id: 5 });
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            copia
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
    indexCopia,
    storeCopia,
    showCopia,
    updateCopia,
    destroyCopia
};