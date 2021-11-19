const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existeCopiaPorId  } = require('../validations/copia.validation');
const { storeCopia, indexCopia, showCopia, updateCopia, destroyCopia } = require('../controllers/CopiasController');
const router = Router();

// listar copias
router.get('/',indexCopia );

// obtener una Copia por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeCopiaPorId),
    validarCampos
], showCopia);

// almacena en la tabla copias

router.post('/',[
    // validarJWT,
    check('edicion_id', 'El pais de nacimiento no tiene valor valido').notEmpty().isNumeric(),
    check('codigo', 'El codigo es obligatorio').trim().notEmpty(),
    check('codigo', 'El codigo tiene la longitud permitida').isLength({min:3, max:50}),
    check('serial', 'El serial es obligatorio').trim().notEmpty(),
    check('serial', 'El serial tiene la longitud permitida').isLength({min:3, max:50}),

    validarCampos
], storeCopia );

// actualizar Copia por id
router.put('/:id',[
    // validarJWT,
    check('id', 'El id es obligatorio').notEmpty().isNumeric(),
    check('id').custom(existeCopiaPorId),
    check('edicion_id', 'El pais de nacimiento no tiene valor valido').notEmpty().isNumeric(),
    check('codigo', 'El codigo es obligatorio').trim().notEmpty(),
    check('codigo', 'El codigo tiene la longitud permitida').isLength({min:3, max:50}),
    check('serial', 'El serial es obligatorio').trim().notEmpty(),
    check('serial', 'El serial tiene la longitud permitida').isLength({min:3, max:50}),

    validarCampos
], updateCopia);

// Borrar una logicamente una Copia
router.delete('/:id',[
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeCopiaPorId),
    // validarJWT,
    // esAdminRole,
    validarCampos
], destroyCopia );

module.exports = router;