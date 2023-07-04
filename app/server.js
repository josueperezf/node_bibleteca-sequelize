const express = require('express');
const { connection } = require('./database/db')
var cors = require('cors');
const rutas = require('./routes/index.routes');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // Conectar a base de datos
        this.conectarDb();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }
    async conectarDb() {
        try {
            // await connection.authenticate();
            await connection.sync({ force: true })
            console.log('base de datos conectada');
        } catch (error) {
            console.log('sin conexion a base de datos');
            throw new Error(error);
        }
    }
    middlewares() {
        // Hacer publico nuestra carpeta publica
        // this.app.use(express.static('public'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //http://localhost:8080/api-docs/
        this.app.use(express.json() );
        // con app.use agrego middleware
        this.app.use(cors());
    }

    routes() {
        rutas.forEach((ruta) => {
            this.app.use(ruta.path, [...ruta.middlewareGlobals], ruta.route );
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;