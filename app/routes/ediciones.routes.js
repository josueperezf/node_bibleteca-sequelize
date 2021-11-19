const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { uniqueEdicionPorIsbn, existeEdicionPorId  } = require('../validations/edicion.validation');
const { storeEdicion, indexEdicion, showEdicion, updateEdicion, destroyEdicion } = require('../controllers/EdicionesController');
const router = Router();

// listar Ediciones de un libro
router.get('/',indexEdicion);

// obtener una Edicion por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeEdicionPorId),
    validarCampos
], showEdicion);

// almacena en la tabla ediciones
router.post('/',[
    // validarJWT,
    check('idioma_id', 'El idioma es obligatorio').notEmpty().trim(),
    check('idioma_id', 'El idioma no tiene valor valido').isNumeric(),
    check('libro_id', 'El libro es obligatorio').notEmpty().trim(),
    check('libro_id', 'El libro no tiene valor valido').isNumeric(),
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('fecha', 'La fecha de edicion es obligatoria').trim().notEmpty(),
    check('fecha', 'La fecha no es valida').isDate() ,
    check('isbn', 'El ISBN es obligatorio').trim().notEmpty(),
    check('isbn', 'El ISBN no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    check('isbn').custom(uniqueEdicionPorIsbn ),
    check('numero_paginas', 'El numero de paginas es obligatorio').notEmpty().isNumeric(),
    validarCampos
], storeEdicion );

router.put('/:id', [
    // validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeEdicionPorId),

    check('idioma_id', 'El idioma es obligatorio').notEmpty().trim(),
    check('idioma_id', 'El idioma no tiene valor valido').isNumeric(),
    check('libro_id', 'El libro es obligatorio').notEmpty().trim(),
    check('libro_id', 'El libro no tiene valor valido').isNumeric(),
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('fecha', 'La fecha de edicion es obligatoria').trim().notEmpty(),
    check('fecha', 'La fecha no es valida').isDate() ,
    check('isbn', 'El ISBN es obligatorio').trim().notEmpty(),
    check('isbn', 'El ISBN no tiene la longitud permitida').isLength({min:3, max:200}).toUpperCase(),
    check('isbn').custom(uniqueEdicionPorIsbn ),
    check('numero_paginas', 'El numero de paginas es obligatorio').notEmpty().isNumeric(),
    validarCampos
], updateEdicion );

// Borrar una logicamente una edicion
router.delete('/:id',[
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeEdicionPorId),
    validarCampos
], destroyEdicion);

module.exports = router;