const { Router} = require('express');

const { indexIdioma } = require('../controllers/IdiomaController');
const router = Router();

router.get('/',indexIdioma);

module.exports = router;