const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, esAdminRole } = require('../middlewares');
const { store, index, show, update, destroy, showPorRut, showPorRutSinUsuario } = require('../controllers/PersonaController');
const { existePersonaPorId, uniquePersonaPorDNi, existePersonaActivaPorDNI  } = require('../validations/persona.validation');
const router = Router();

// listar categorias
router.get('/',index);

// obtener una Persona por id
// validarJWT lo tengo comentado, ya que en el archivo index.router tengo un middleware que es global para cada metodo de la ruta,
// asi que mejor colocarlo alli en en cada uno de las rutas del router
router.get('/:id', [
    // validarJWT,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
    validarCampos
], show);

// obtener una Persona por dni o rut, debe ir tal como esta en la base de datos con o sin puntos
router.get('/dni/:dni', [
    // validarJWT,
    check('dni', 'El un persona con el dni ingresado').notEmpty().trim(),
    check('dni').custom(existePersonaActivaPorDNI),
    validarCampos
], showPorRut);

// obtener una Persona por dni o rut que no tengan cuenta de usuario
// su => es para decir sin usuario, no se me ocurrio nada mas y queria url corta
router.get('/su/dni/:dni', [
    check('dni', 'El un persona con el dni ingresado').notEmpty().trim(),
    check('dni').custom(existePersonaActivaPorDNI),
    validarCampos
], showPorRutSinUsuario);

// almacena en la tabla persona
router.post('/',[
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
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
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
// esAdminRole solo el administrado puede borrar
router.delete('/:id',[
    esAdminRole,
    check('id', 'El id es obligatorio').notEmpty().trim(),
    check('id', 'El id no es valido').isNumeric(),
    check('id').custom(existePersonaPorId),
    validarCampos
], destroy);

module.exports = router;