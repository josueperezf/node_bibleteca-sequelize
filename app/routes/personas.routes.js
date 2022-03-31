const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { store, index, show, update, destroy } = require('../controllers/PersonaController');
const { existePersonaPorId, uniquePersonaPorDNi  } = require('../validations/persona.validation');
const router = Router();

// listar categorias
router.get('/',index);

// obtener una Persona por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
    validarCampos
], show);

// almacena en la tabla persona
router.post('/',[
    // validarJWT,
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
    validarCampos
], store );

// actualizar persona por id
router.put('/:id',[
    // validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
    
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
    check('fecha_nacimiento', 'La fecha de nacimiento no es valida').isDate(),

    validarCampos
],update);

// Borrar una logicamente una persona
router.delete('/:id',[
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
    // validarJWT,
    // esAdminRole,
    validarCampos
], destroy);

module.exports = router;