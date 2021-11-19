const { validarJWT} = require('../middlewares');

const rutas = [
    {path: '/api/auth',         route: require('./auth.routes'),        middlewareGlobals: [    ]},
    {path: '/api/autores',      route: require('./autores.routes'),     middlewareGlobals: [    ]},
    {path: '/api/copias',       route: require('./copias.routes'),      middlewareGlobals: [    ]},
    {path: '/api/ediciones',    route: require('./ediciones.routes'),   middlewareGlobals: [    ]},
    {path: '/api/libros',       route: require('./libros.routes'),      middlewareGlobals: [    ]},
    {path: '/api/paises',       route: require('./pais.routes'),        middlewareGlobals: [    ]},
    {path: '/api/personas',     route: require('./personas.routes'),    middlewareGlobals: [    ]},
    {path: '/api/prestamos',    route: require('./prestamos.routes'),   middlewareGlobals: [    ]},
    {path: '/api/usuarios',     route: require('./usuarios.routes'),    middlewareGlobals: [    ]},
];


module.exports = rutas;