const { validationResult } = require('express-validator');
// todos los middleware pueden recibir req y response como parametros
const validarCampos = (req, res, next)=>{
    /**
     * validationResult retorna los errores que haya encontrado en el middleware que se coloco en el router, este middleware tambien es de express-validator
     */
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        let e404 = false;
        let msg404 = ''
        errores.errors.map((e) => {
            console.log(e.msg);
            if (e.msg.search('404') !== -1) {
                console.log('encontro');
                e404 = true;
                msg404 = e.msg.replaceAll('404,', '').trim();
            }
        });
        if (e404) {
            // debo retornar mejor un objeto que un string, pero ya por ahora lo dejare asi
            return res.status(404).json(msg404);
        }
        return res.status(400).json(errores);
    }
    // si pasa la validacion, entonces avance a la siguiente fase o el controller
    next();
}

module.exports = {
    validarCampos
}