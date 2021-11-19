const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { Usuario, Persona, TipoUsuario } = require('../models');

const login = async (req = request, res = response) => {
    const {login, password } = req.body;
    try {
        // verificar si el correo existe
        const include = [
            {model: Persona, as: 'persona'},
            {model: TipoUsuario, as: 'tipo_usuario'},
        ];
        const usuario = await Usuario.findOne({where:{login}, include});
        if(!usuario) {
            return res.status(400).json({
                msg:'login / password no son validos - correo'
            });
        }
        // verificar si el usuario esta activo
        if(!usuario.estatus) {
            return res.status(400).json({
                msg:'Usuario / password no son validos - estado false'
            });
        }
        // verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg:'Usuario / password no son validos - password'
            });
        }
        // generar jwt
        const token = await generarJWT({
            id: usuario.id,
            login: usuario.login,
            nombre: usuario.persona?.nombre,
            tipo_usuario:usuario?.tipo_usuario?.nombre
        });

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        // el return es para que salga y no ejecute nada mas
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}
// la siguiente funcion permite logearse con google y si el usuario no existe en mi tabla de usuario, lo creo con los datos que da google 
const googleSignIn = async (req, res = response) => {
    const { id_token} = req.body;
    try {
        const {login, img, nombre} = await googleVerify(id_token);
        // verificar si el correo de la persona que se estra tratando de logear con google ya existe en la base de datos
        let usuario = await Usuario.findOne({login});
        // si el usuario no existe en mi aplicacion, lo creo
        // password el colocamos una carita por que en la regla de validacion digimos que seria obligatorio, asi que no puede estar vacio
        /*
        if(!usuario) {
            const data = {
                nombre,
                login,
                password:':p',
                img,
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save();
            
        }
        */
        // si el usuario existe en la base de datos pero su estado o estatus esta en falso, no lo dejo entrar
        if(!usuario.estatus) {
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado',
             });
        }

        // generar jwt
        const token = await generarJWT(usuario);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg:'Token de Google no es valido' ,
         });
    }
}
const revalidarToken = async (req, res = response) => {
    const {usuario} = req;
    const {id, login} = usuario;
    
    // si llega aca, hay que generar el token
    // const token = await generarJWT(_id, name);
    try {
        const include = [
            {model: Persona, as: 'persona'},
            {model: TipoUsuario, as: 'tipo_usuario'},
        ];
        const usuario = await Usuario.findOne({where:{id, login}, include});
        const token = await generarJWT({
            id: usuario.id,
            login: usuario.login,
            nombre: usuario.persona?.nombre,
            tipo_usuario:usuario?.tipo_usuario?.nombre
        });
        res.json({
            ok: true,
            msg: 'renew',
            token,
            usuario,
        });
    } catch (error) {
        console.log(error);
        // el return es para que salga y no ejecute nada mas
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}


module.exports = {
    login,
    googleSignIn,
    revalidarToken
}