// const validarArchivoParaSubir  = require('../middlewares/validar-archivo');
const validarCampos = require('./validar-campos');
const validarJWT    = require('./validar-jwt');
const validarRoles  = require('./validar-roles');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

// los tres puntos es para decir que todo lo que exporte cada uno de los middleware y este en las variables, ejemplo, validarRoles, tambien va a ser exportado
module.exports = {
    // ...validarArchivoParaSubir,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}