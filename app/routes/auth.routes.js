const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, revalidarToken } = require('../controllers/AuthController');
const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('login', 'El correo es obligatorio').notEmpty(),
    check('login', 'Debe ser un correo valido').isEmail(),
    check('password', 'el password es obligatoria').notEmpty(),
    validarCampos
], login );

router.get('/renew', validarJWT , revalidarToken);

module.exports = router;