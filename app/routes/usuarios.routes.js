const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, esAdminRole, validarJWT } = require('../middlewares');
const { uniquePersonaPorUsuarioId, existeUsuarioPorId, uniqueLogin  } = require('../validations/usuario.validation');
const { existePersonaActivaPorId  } = require('../validations/persona.validation');

const { indexUsuario, showUsuario, storeUsuario, destroyUsuario, updateUsuario, restartUsuario, updatePassword } = require('../controllers/UsuarioController');

const router = Router();

// listar usuarios
router.get('/', indexUsuario );

// obtener un usuario por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], showUsuario );

// almacena en la tabla usuario
router.post('/', [
    validarJWT,
    check('persona_id', 'La persona requerida').isNumeric(),
    check('persona_id').custom(existePersonaActivaPorId),
    check('persona_id').custom(uniquePersonaPorUsuarioId),
    check('login', 'El dni nombre es obligatorio').trim().notEmpty(),
    check('login', 'El dni no tiene la longitud permitida').isLength({min:10, max:50}),
    check('login').custom(uniqueLogin),
    check('password', 'El password es obligatorio').trim().notEmpty(),
    check('password', 'El password no tiene la longitud permitida').isLength({min:4, max:10}).toUpperCase(),
    esAdminRole,
    validarCampos
], storeUsuario );

// lo puede hacer el administrador, puede editar la persona, y el login, el password solo lo puede editar cada usuario
router.put('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    check('persona_id', 'La persona requerida').isNumeric(),
    check('persona_id').custom(existePersonaActivaPorId),
    check('persona_id').custom(uniquePersonaPorUsuarioId),
    check('login', 'El dni nombre es obligatorio').trim().notEmpty(),
    check('login', 'El dni no tiene la longitud permitida').isLength({min:10, max:50}),
    esAdminRole,
    validarCampos
], updateUsuario );

// actualizar el password del usuario
// p => es para hacer referencia que lo que actualizara es el password
router.put('/p/:id', [
    validarJWT,
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
    validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    esAdminRole,
    validarCampos
], destroyUsuario );


// restaurar logicamente un usuario
router.post('/restaurar/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeUsuarioPorId),
    esAdminRole,
    validarCampos
], restartUsuario );


module.exports = router;