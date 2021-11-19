const { response } = require("express");
const { TIPO_USUARIO } = require("../enums");

// este middleware se debe colocar en el router, bajo el middleware que valida si es token valido
const esAdminRole = async (req, res = response, next )=>{
    if (!req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    console.log({aqui: req.usuario});
    const {tipo_usuario_id, login } = req.usuario;
    if (tipo_usuario_id !== TIPO_USUARIO.ADMINISTRADOR) {
        return res.status(401).json({
            msg: `el usuario ${login} no es administrador`
        });
    }
    next();
}

// tieneRole se llama desde el router, alli se pasan los parametros asi: tieneRole(1,2)  Eequivalente a ('ADMINISTRADOR','OPERADOR'), pueden muchos roles
// tieneRole es definida con ...roles, esto indica que si cuando la llaman le pasan mil argumentos, los mil los va a guardar el la variable roles, gracias a los ...   roles es un array
const tieneRole = (...roles )=>{
    // esta seccion es porque la funcion primero necesita recibir lo parametros que le envie el router y luego si hacer el response y demas
    return (req, res = response, next )=>{
        if (! req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if (!roles.includes(req.usuario?.tipo_usuario_id)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }
        // console.log(roles);
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}