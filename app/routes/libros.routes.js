const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existeLibroPorId  } = require('../validations/libro.validation');
const { existeTodosLosAutoresPorId  } = require('../validations/autor.validation');
const { storeLibro, indexLibro, showLibro, updateLibro, destroyLibro, editLibro } = require('../controllers/LibroController');
const router = Router();

// listar Libros
router.get('/',indexLibro );


// almacena un libro, debe pasar id de autores e idiomas en los que esta ese libro
/**
 * cuando se envia autores, al ser array, no se le debe hacer un trim, ya que borra los elementos del array, dejando solo el primero
*/
router.post('/',[
    // validarJWT,
    check('titulo', 'El titulo es obligatorio').notEmpty().trim(),
    check('titulo', 'El titulo no tiene la longitud permitida').isLength({min:6, max:50}).toUpperCase(),
    check('autores', 'Los autores no tienen el valor esperado').isArray(),
    check('autores', 'autores no tiene la longitud permitida').notEmpty(),
    check('autores').custom(existeTodosLosAutoresPorId),

    validarCampos
], storeLibro );


// obtener libro por id
router.get('/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeLibroPorId),
    validarCampos
], showLibro );

// obtener libro por id para editar
router.get('/edit/:id', [
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeLibroPorId),
    validarCampos
], editLibro );

// actualizar Libro por id
router.put('/:id',[
    // validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existeLibroPorId),
    
    check('titulo', 'El titulo es obligatorio').notEmpty().trim(),
    check('titulo', 'El titulo no tiene la longitud permitida').isLength({min:6, max:50}).toUpperCase(),
    check('autores', 'Los autores no tienen el valor esperado').isArray(),
    check('autores', 'autores no tiene la longitud permitida').notEmpty(),
    check('autores').custom(existeTodosLosAutoresPorId),

    validarCampos
],updateLibro );

// Borrar un logicamente un libro
router.delete('/:id',[
    check('id', 'El id es obligatorio').notEmpty().trim().isNumeric(),
    check('id').custom(existeLibroPorId),
    validarCampos
], destroyLibro );

module.exports = router;