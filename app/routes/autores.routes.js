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
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').trim().notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento no es valida').isDate(),
    check('pais_id', 'El pais de nacimiento es obligatorio').notEmpty().trim(),
    check('pais_id', 'El pais de nacimiento no tiene valor valido').isNumeric(),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:250}).toUpperCase(),
    validarCampos
], storeAutor );

// edita la tabla autor
router.put('/:id',[
    // validarJWT,
    check('id').custom(existeAutorPorId),
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').trim().notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento no es valida').isDate(),
    check('pais_id', 'El pais de nacimiento es obligatorio').notEmpty().trim(),
    check('pais_id', 'El pais de nacimiento no tiene valor valido').isNumeric(),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:250}).toUpperCase(),
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