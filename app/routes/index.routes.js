const { validarJWT} = require('../middlewares');

const rutas = [
    {path: '/api/auth',         route: require('./auth.routes'),        middlewareGlobals: [    ]},
    {path: '/api/autores',      route: require('./autores.routes'),     middlewareGlobals: [validarJWT]},
    {path: '/api/copias',       route: require('./copias.routes'),      middlewareGlobals: [validarJWT]},
    {path: '/api/ediciones',    route: require('./ediciones.routes'),   middlewareGlobals: [validarJWT]},
    {path: '/api/libros',       route: require('./libros.routes'),      middlewareGlobals: [validarJWT]},
    {path: '/api/paises',       route: require('./pais.routes'),        middlewareGlobals: [validarJWT]},
    {path: '/api/personas',     route: require('./personas.routes'),    middlewareGlobals: [validarJWT]},
    {path: '/api/prestamos',    route: require('./prestamos.routes'),   middlewareGlobals: [validarJWT]},
    {path: '/api/usuarios',     route: require('./usuarios.routes'),    middlewareGlobals: [validarJWT]},
];


module.exports = rutas;