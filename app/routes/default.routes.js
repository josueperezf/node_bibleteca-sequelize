const { Router, response, request} = require('express');
const router = Router();

const rutaNoEncontrada = async (req = request, res = response) => {
    return res.status(404).json({
        msg:'Ruta no disponible'
    });
};

router.get('/*', rutaNoEncontrada );
router.get('/api/', rutaNoEncontrada );
router.get('/api/*', rutaNoEncontrada );

module.exports = router;