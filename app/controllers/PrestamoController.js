const { response, request } = require("express");
const { Op} = require('sequelize');
const { ESTADOS, ESTATUS_PRESTAMO } = require("../enums/index");
const { Persona, Copia, Estado, Edicion, Prestamo, CopiaPrestamo } = require("../models");
const moment = require('moment-timezone');

const indexPrestamo = async (req = request, res=response) => {
    // parametros que puedan pasar, ejemplo ?pag=2 etc
    /**
     * la variable 'estado' es para listar todas las personas,
     * puede tener tres valores
     * 1) 'undefined' para cuando el frontend no envio el parametro, alli listara lo que diga el limit si tiene
     * 2) '1' para que liste estado los activos
     * 3) '0' para que liste estado estatus 0 
     * 4) '2' para que liste a estado los estatus
     */
    const {limite:limit = 10, desde:offset = 0, estado, todos, query = ''} = req.query;
    /**
     * fecha devolucion, muestra si el libro fue devuelto o no,
     * si el estado es igual a 1, es para que enseñe los prestamos que no se han devuelto,
     * de lo contrario enseña los devueltos, o mejor dicho, los que tengan fecha de devolucion
     */
    estatus_prestamo_id = {};
    if (!todos) {
        estatus_prestamo_id = {estatus_prestamo_id: {[Op.in]: [ESTATUS_PRESTAMO.PRESTADO, ESTATUS_PRESTAMO.ENTREGA_PARCIAL, ESTATUS_PRESTAMO.ENTREGA_TOTAL_CON_PERDIDA ]}};
    }
    // estatus_prestamo_id = (estado != 1 ) ? {estatus_prestamo_id: {[Op.not]: null} } : {estatus_prestamo_id: {[Op.is]: null} };
    if ((estado >= 1) && (estado <= 6) ) {
        estatus_prestamo_id = {estatus_prestamo_id: {[Op.is]: estado} };
    }
    console.log({estatus_prestamo_id});
    const where = (todos) ? {} : estatus_prestamo_id;
    const order = [
        ['id', 'DESC'],
    ];

    const [prestamos, total ] = await Promise.all([
        (todos)
         ? Prestamo.scope({ method: ['buscar', {value: query} ] }).findAll({ order})
         : Prestamo.scope({ method: ['buscar', {value: query, order, limit: parseInt(limit), offset: parseInt(offset) }]} ).findAll({where, order}),
         Prestamo.scope({ method: ['buscar', {value: query}] }).count({where})
     ]);
    return res.json({
        prestamos,
        total
    });
}

const storePrestamo = async (req = request, res=response) => {
    const { persona_id}  = req.body;
    const copias = [...new Set(req.body.copias)];
    try {
        const data = {persona_id, estatus_prestamo_id:1};
        const prestamo = await Prestamo.create(data);
        await prestamo.setCopias(copias);
        // le cambio el estado de la copia a 2 que es prestado
        await Copia.update({estado_id: 2}, {where: [{id: copias}]});
        res.status(201).json({
            ok: true,
            prestamo,
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

const showPrestamo = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
        {model: Persona, as: 'persona'},
        {
            model: Copia, as: 'copias',
            include: [
                {model: Estado, as: 'estado'},
                {model: Edicion, as: 'edicion'},
            ]
        },
    ];
    const prestamo = await Prestamo.findByPk(id,{include});
    res.status(200).json({
        ok: true,
        prestamo
    });
}

/**
 * segun mi criterio, una persona de un prestamo solo puede modificar el id de la persona por caso particular,
 * si necesita quitar un producto, hace una devolucion, si necesita agregar otro producto, entonces crear un nuevo prestamo
*/



const updatePrestamo = async (req, res=response) => {
    const { id }   = req.params;
    const copiasDevueltas = [...new Set(req.body.copiasDevueltas)] || [];
    const copiasExtraviadas = [...new Set(req.body.copiasExtraviadas)] || [];
    const totalCopiasProcesar = [... copiasDevueltas, ...copiasExtraviadas];
    const { persona_id}  = req.body;
    const format = 'YYYY-MM-DD HH:mm:ss';
    const now = moment.tz('America/Santiago').format(format).toString();
    // la siguiente linea la pongo, por que si no lo hago y trato de insertar el now como tal, me coloca unas horas de diferencia, asi sea la hora de santiago y demas,
    //  creo q esto se debe a la forma que tiene sequelize para tratar los input timestamp
    const  fecha_actualizacion = moment(now).toDate();
    try {
        let prestamo = await Prestamo.findByPk(id);

        await Promise.all([
            CopiaPrestamo.update({fecha_actualizacion }, {where: [{prestamo_id: id}, {copia_id: totalCopiasProcesar} ]}),
            Copia.update({estado_id: ESTADOS.DISPONIBLE }, {where: [{id: copiasDevueltas}]}),
            Copia.update({estado_id: ESTADOS.EXTRAVIADO }, {where: [{id: copiasExtraviadas}]})
        ]);
        prestamo = await Prestamo.findByPk(id, {include: [{model: Copia, as: 'copias' } ]});
        const totalCopias = prestamo.copias.length;
        const totalCopiasPrestadas = (prestamo.copias.filter((copia => copia.estado_id === ESTADOS.PRESTADO )) || []).length;
        const totalCopiasExtraviadas = (prestamo.copias.filter((copia => copia.estado_id === ESTADOS.EXTRAVIADO )) || []).length;

        if ((totalCopiasPrestadas > 0)  && (totalCopiasExtraviadas === 0) && (totalCopias !== totalCopiasPrestadas) ) {
            await prestamo.update({persona_id, estatus_prestamo_id: ESTATUS_PRESTAMO.ENTREGA_PARCIAL });
        } else if ((totalCopiasPrestadas === 0)  && (totalCopiasExtraviadas === 0) && (totalCopias > 0 ) ) {
            await prestamo.update({persona_id, estatus_prestamo_id: ESTATUS_PRESTAMO.ENTREGA_TOTAL })
        } else if ((totalCopiasPrestadas === 0)  && (totalCopiasExtraviadas > 0) && (totalCopias > totalCopiasExtraviadas ) ) {
            await prestamo.update({persona_id, estatus_prestamo_id: ESTATUS_PRESTAMO.ENTREGA_TOTAL_CON_PERDIDA })
        } else if ((totalCopiasPrestadas === totalCopias)  && (totalCopias > 0 ) ) { 
            await prestamo.update({persona_id, estatus_prestamo_id: ESTATUS_PRESTAMO.PERDIDA_TOTAL})
        } else if ((totalCopiasPrestadas > 0)  && (totalCopiasExtraviadas > 0) && (totalCopias !== totalCopiasPrestadas) ) { 
            await prestamo.update({persona_id, estatus_prestamo_id: ESTATUS_PRESTAMO.ENTREGA_PARCIAL_CON_PERDIDA})
        }
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            prestamo
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
    indexPrestamo,
    storePrestamo,
    showPrestamo,
    updatePrestamo,
};