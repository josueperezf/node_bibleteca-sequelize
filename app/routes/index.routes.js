const { validarJWT} = require('../middlewares');
// middlewareGlobals pueden ser varios los middleware que se pasen en el array, esto es para que todos se apliquen en todas las rutas del router en el que este
// en auth.routes no tengo validarJWT, es por que el login no requiere estar logueado,
// el renew si requiree estar logueado, por ello es que solo en ese metodo se coloca el midleware validarJWT

const rutas = [
    {path: '/api/auth',         route: require('./auth.routes'),        middlewareGlobals: [    ]},
    {path: '/api/autores',      route: require('./autores.routes'),     middlewareGlobals: [validarJWT]},
    {path: '/api/copias',       route: require('./copias.routes'),      middlewareGlobals: [validarJWT]},
    {path: '/api/ediciones',    route: require('./ediciones.routes'),   middlewareGlobals: [validarJWT]},
    {path: '/api/idiomas',      route: require('./idiomas.routes'),     middlewareGlobals: [validarJWT]},
    {path: '/api/libros',       route: require('./libros.routes'),      middlewareGlobals: [validarJWT]},
    {path: '/api/paises',       route: require('./pais.routes'),        middlewareGlobals: [validarJWT]},
    {path: '/api/personas',     route: require('./personas.routes'),    middlewareGlobals: [validarJWT]},
    {path: '/api/prestamos',    route: require('./prestamos.routes'),   middlewareGlobals: [validarJWT]},
    {path: '/api/usuarios',     route: require('./usuarios.routes'),    middlewareGlobals: [validarJWT]},
];


module.exports = rutas;