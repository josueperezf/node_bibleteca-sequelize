// const NODE_ENV = process.env.NODE_ENV || 'development';
// console.log({NODE_ENV});
// require('dotenv').config({path: `.env.${NODE_ENV}` });
require('dotenv').config();

const Server = require('./app/server');
const server = new Server();
server.listen();