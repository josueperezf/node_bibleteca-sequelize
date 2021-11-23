const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existeAutorPorId, uniqueAutorPorPersonaId } = require('../validations/autor.validation');
const { uniquePersonaPorDNi } = require('../validations/persona.validation');
const { indexAutor, showAutor, storeAutor, storePersonaAutor, destroyAutor, updateAutor } = require('../controllers/AutoresController');
const router = Router();


// listar autores
router.get('/', indexAutor);

// obtener un autor por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeAutorPorId),
    validarCampos
], showAutor );

// almacena en la tabla autores
router.post('/',[
    // validarJWT,
    check('persona_id', 'La persona es obligatoria').notEmpty().trim(),
    check('persona_id', 'persona no es valido').isNumeric(),
    check('persona_id').custom(uniqueAutorPorPersonaId),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    validarCampos
], storeAutor );

// almecena persona y autor simultaneamente
router.post('/', [
    // validarJWT,
    check('pais_id', 'El pais de nacimiento es obligatorio').notEmpty().trim(),
    check('pais_id', 'El pais de nacimiento no tiene valor valido').isNumeric(),
    check('dni', 'El dni nombre es obligatorio').trim().notEmpty(),
    check('dni', 'El dni no tiene la longitud permitida').isLength({min:6, max:50}),
    check('dni').custom(uniquePersonaPorDNi ),
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('direccion', 'La dirección es obligatoria').trim().notEmpty(),
    check('direccion', 'La dirección no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    // check('telefono', 'El telefono es obligatorio').trim().notEmpty(),
    // check('telefono', 'El telefono no tiene la longitud permitida').isLength({min:6, max:20}),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').trim().notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento no es valida').isDate() ,
    check('persona_id', 'La persona es obligatoria').notEmpty().trim(),
    check('persona_id', 'persona no es valido').isNumeric(),
    check('persona_id').custom(uniqueAutorPorPersonaId),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    validarCampos
], storePersonaAutor );


// edita la tabla autor
router.put('/:id',[
    // validarJWT,
    check('id').custom(existeAutorPorId),
    check('persona_id', 'La persona es obligatoria').notEmpty().trim(),
    check('persona_id', 'persona no es valido').isNumeric(),
    check('persona_id').custom(uniqueAutorPorPersonaId),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    validarCampos
], updateAutor );

// Borrar una logicamente un autor
router.delete('/:id',[
    check('id').custom(existeAutorPorId),
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeAutorPorId ),
    // validarJWT,
    // esAdminRole,
    validarCampos
], destroyAutor );
module.exports = router;