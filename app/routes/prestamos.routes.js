const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existePrestamoPorId  } = require('../validations/prestamo.validation');
const { disponiblesTodasLasCopiasPorId  } = require('../validations/copia.validation');

const { storePrestamo, indexPrestamo, showPrestamo, updatePrestamo } = require('../controllers/PrestamoController');
const router = Router();

// listar Prestamos
router.get('/',indexPrestamo );

// obtener una Persona por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePrestamoPorId),
    validarCampos
], showPrestamo);

// almacena en la tabla Prestamo
router.post('/',[
    // validarJWT,
    check('persona_id', 'El pais de nacimiento no tiene valor valido').notEmpty().isNumeric(),
    check('copias', 'La(s) copia(s) no tienen el valor esperado').isArray(),
    check('copias', 'La(s) copia(s) no tiene la longitud permitida').notEmpty(),
    check('copias').custom(disponiblesTodasLasCopiasPorId ),
    // check('copias').custom((copias)=>{disponiblesTodasLasCopiasPorId(copias) }),
    validarCampos
], storePrestamo );

// actualizar Prestamo por id
router.put('/:id',[
    // validarJWT,
    check('id', 'E 0 id es obligatorio').notEmpty().isNumeric(),
    check('id').custom(existePrestamoPorId),
    check('persona_id', 'El pais de nacimiento no tiene valor valido').notEmpty().isNumeric(),
    // check('copias', 'La(s) copia(s) no tienen el valor esperado').isArray(),
    // check('copias', 'La(s) copia(s) no tiene la longitud permitida').notEmpty(),
    // la siguiente linea la comente, ya que decidi que en los prestamos se puede editar solo la persona, si se cambian los articulos ya se veria como una devolucion
    check('copias').custom(disponiblesTodasLasCopiasPorId ),
    validarCampos
], updatePrestamo );

module.exports = router;