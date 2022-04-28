const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, esAdminRole, validarJWT } = require('../middlewares');
const { uniquePersonaPorUsuarioId, existeUsuarioPorId, uniqueLogin  } = require('../validations/usuario.validation');
const { existePersonaActivaPorId  } = require('../validations/persona.validation');

const { indexUsuario, showUsuario, storeUsuario, destroyUsuario, updateUsuario, restartUsuario, updatePassword } = require('../controllers/UsuarioController');

const router = Router();

// listar usuarios
router.get('/', esAdminRole, indexUsuario );

// obtener un usuario por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], showUsuario );

// almacena en la tabla usuario
// las cuentas de usuario solo las puede crear el administrador, les agrega un password basico y luego cada usuario operador puede editarlo a su gusto
router.post('/', [
    esAdminRole,
    check('persona_id', 'La persona requerida').isNumeric(),
    check('persona_id').custom(existePersonaActivaPorId),
    check('persona_id').custom(uniquePersonaPorUsuarioId),
    check('login', 'El dni nombre es obligatorio').trim().notEmpty(),
    check('login', 'El dni no tiene la longitud permitida').isLength({min:10, max:50}),
    check('login').custom(uniqueLogin),
    check('password', 'El password es obligatorio').trim().notEmpty(),
    check('password', 'El password no tiene la longitud permitida').isLength({min:4, max:10}).toUpperCase(),
    validarCampos
], storeUsuario );

// lo puede hacer el administrador, puede editar la persona, y el login, el password solo lo puede editar cada usuario
router.put('/:id', [
    esAdminRole,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    check('persona_id', 'La persona requerida').isNumeric(),
    check('persona_id').custom(existePersonaActivaPorId),
    check('persona_id').custom(uniquePersonaPorUsuarioId),
    check('login', 'El dni nombre es obligatorio').trim().notEmpty(),
    check('login', 'El dni no tiene la longitud permitida').isLength({min:10, max:50}),
    validarCampos
], updateUsuario );

// actualizar el password del usuario
// p => es para hacer referencia que lo que actualizara es el password
// solo se puede actualizar el password de cada quien, no se permite cambiar el password de otra persona
router.put('/p/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    check('password', 'El password es obligatorio').trim().notEmpty(),
    check('password', 'El password no tiene la longitud permitida').isLength({min:4, max:10}).toUpperCase(),
    check('newPassword', 'El nuevo password es obligatorio').trim().notEmpty(),
    check('newPassword', 'El nuevo password no tiene la longitud permitida').isLength({min:4, max:10}).toUpperCase(),
    validarCampos
], updatePassword );

// Borrar una logicamente un usuario
router.delete('/:id', [
    esAdminRole,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], destroyUsuario );


// restaurar logicamente un usuario
router.post('/restaurar/:id', [
    esAdminRole,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], restartUsuario );


module.exports = router;