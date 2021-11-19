const { response, request } = require("express");
const { Autor, Persona, Pais, Libro} = require("../models");

const indexAutor = async (req = request, res=response) => {
     const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
     // where = {} listaria todo, seria un where sin condicion
     const estatus = (estado != 1 ) ? 0 : 1;
     const where = (todos) ? {} : {estatus};
     /**
      * en el include lo que hago es que le digo a la consulta que traiga la relacion que tiene la tabla autor con persona,
      * asi mismo, le digo que de persona, use el scope o metodo llamado 'buscar',
      * este me ayuda a hacer las busquedas like de autores por nombre o cualquier otro campo,
      * recordemos que estos valores estan el la tabla persona no en la autor, asi que es en persona donde debo buscar
      * tambien, aprovecho y traigo la relacion que tiene persona con pais, para saber el pais de nacimiento del autor
      */
     const include = [
        {  
            model: Persona.scope({ method: ['buscar', query] }),
            as: 'persona',
            include: [ {model: Pais, as: 'pais'} ]
        },
     ];
     const order = [['id', 'DESC']];
     
     const [autores, total ] = await Promise.all([
        (todos)
         ? Autor.scope(['autores', { method: ['buscar', query] }]).findAll({include, order})
         : Autor.findAll({include, where, limit: parseInt(limit), offset: parseInt(offset), order}),
         Autor.count({include, where})
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
    const { persona_id, biografia}  = req.body;
    try {
        const data = { persona_id, biografia};
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

const storePersonaAutor = async (req = request, res=response) => {
    const {pais_id, dni, nombre, direccion, fecha_nacimiento, telefono = '', persona_id, biografia}  = req.body;
    try {
        let data =  {pais_id, dni, nombre, direccion, fecha_nacimiento, telefono};
        const persona = await Persona.create(data);
        if (persona?.id) {
            data = { persona_id: persona.id, biografia};
            const autor = new Autor(data);
            await autor.save ();
            res.status(201).json({
                ok: true,
                autor,
                msg: `Operación exitosa`
            });
        } else {
            return res.status(500).json({
                ok: false,
                msg:'Hable con el administrador',
            });
        }
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
    const { persona_id, biografia}  = req.body;
    const data = { persona_id, biografia};
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