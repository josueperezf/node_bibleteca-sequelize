
const { response, request } = require("express");
const { Persona, Usuario, TipoUsuario} = require("../models");
const bcryptjs = require('bcryptjs');


const indexUsuario = async (req = request, res=response) => {
    const {limite:limit = 10, desde:offset = 0, estado = 1, todos, query = ''} = req.query;
    // where = {} listaria todo, seria un where sin condicion
    const estatus = (estado != 1 ) ? 0 : 1;
    const where = (todos) ? {} : {estatus};
    const include = [{model: Persona, as: 'persona'}];
    const order = [
        ['id', 'DESC'],
        // ['name', 'ASC'],
    ];
    const [usuarios, total ] = await Promise.all([
       (todos)
        ? Usuario.scope({ method: ['buscar', {value: query} ] }).findAll({ include, order})
        : Usuario.scope({ method: ['buscar', {value: query, order, limit: parseInt(limit), offset: parseInt(offset) }]} ).findAll({where, order}),
        Usuario.scope({ method: ['buscar', {value: query}] }).count({where})
    ]);
    return res.json({
        usuarios,
        total
    });
}

const storeUsuario = async (req = request, res=response) => {
    const { tipo_usuario_id = 2, persona_id, login}  = req.body;
    let { password}  = req.body;
    // console.log({ pais_id, dni, nombre, direccion, fecha_nacimiento, telefono});
    try {
        const salt = bcryptjs.genSaltSync(10);
        password = bcryptjs.hashSync(password,salt);
        const data = { tipo_usuario_id, persona_id, login, password};
        const usuario = await Usuario.create(data);
        // await persona.save();
        res.status(201).json({
            ok: true,
            usuario,
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

const showUsuario = async (req = request, res=response) => {
    const {id} =  req.params;
    const include = [
                        {model: Persona, as: 'persona'},
                        {model: TipoUsuario, as: 'tipo_usuario'},
                    ];
    const usuario = await Usuario.findByPk(id,{include});
    delete usuario.id;
    // console.log({usuario});
    res.status(200).json({
        ok: true,
        usuario
    });
}

const updateUsuario = async (req, res=response) => {
    const { id }   = req.params;
    const { tipo_usuario_id = 2, persona_id, login}  = req.body;
    const data = { tipo_usuario_id, persona_id, login };

    try {
        const usuario = await Usuario.findByPk(id);
        await usuario.update(data);
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const updatePassword = async (req, res=response) => {
    try {
        const { id }   = req.params;
        let { password, newPassword}  = req.body;
        const  { id: idUsuarioLogueado} = req.usuario;

        if (id != idUsuarioLogueado) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'password',
                        msg: 'No autorizado'
                    }
                ]
            });
        }
        const usuario = await Usuario.findByPk(id);
        
        // verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                errors: [
                    {
                        param: 'password',
                        msg: 'Password actual incorrecto'
                    }
                ]
            });
        }

        // encriptamos el nuevo password
        if (newPassword && (newPassword.length >= 4 && newPassword.length <= 10 ) ) {
            const salt = bcryptjs.genSaltSync(10);
            newPassword = bcryptjs.hashSync(newPassword, salt);
        }

    
        await usuario.update({password: newPassword});
        res.status(200).json({
            ok: true,
            msg: `Operacion Exitosa`,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }  
}

const destroyUsuario = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        await usuario.update({ estatus: 0 });
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

const restartUsuario = async (req, res=response) => {
    const { id } =  req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        await usuario.update({ estatus: 1 });
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
    indexUsuario,
    storeUsuario,
    showUsuario,
    updateUsuario,
    updatePassword,
    destroyUsuario,
    restartUsuario
};