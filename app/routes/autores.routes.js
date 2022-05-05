const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, esAdminRole } = require('../middlewares');
const { existeAutorPorId } = require('../validations/autor.validation');
const { indexAutor, showAutor, storeAutor, destroyAutor, updateAutor } = require('../controllers/AutoresController');
const { existePaisActivoPorId } = require('../validations/pais.validation');
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
// validarJWT lo tengo comentado, ya que en el archivo index.router tengo un middleware que es global para cada metodo de la ruta,
// asi que mejor colocarlo alli en en cada uno de las rutas del router
router.post('/',[
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    check('nombre', 'El nombre no tiene la longitud permitida').isLength({min:3, max:100}).toUpperCase(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').trim().notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento no es valida').isDate(),
    check('pais_id', 'El pais de nacimiento es obligatorio').notEmpty().trim(),
    check('pais_id', 'El pais de nacimiento no tiene valor valido').isNumeric(),
    check('pais_id').custom(existePaisActivoPorId),
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
    check('pais_id').custom(existePaisActivoPorId),
    check('biografia', 'La biografia es obligatoria').trim().notEmpty(),
    check('biografia', 'La biografia no tiene la longitud permitida').isLength({min:3, max:250}).toUpperCase(),
    validarCampos
], updateAutor );

// Borrar una logicamente un autor
//esAdminRole se ejecuta despues del middleware global que tengo que verifica si tiene un token valido
router.delete('/:id',[
    esAdminRole,
    check('id').custom(existeAutorPorId),
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeAutorPorId ),
    validarCampos
], destroyAutor );
module.exports = router;