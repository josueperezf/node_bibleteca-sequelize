const { Router} = require('express');

const { indexPais } = require('../controllers/PaisController');
const router = Router();

router.get('/',indexPais);

module.exports = router;