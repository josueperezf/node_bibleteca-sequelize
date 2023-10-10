const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
console.log({file: 'db', env});
const config = require('../../config/database')[env];
// console.log({config});
const db = {};
db.connection = new Sequelize(config.database, config.username, config.password, config);


/**
 * host 151.106.98.0
 * user u724044595_biblioteca
 * database u724044595_biblioteca
 * password Uribante4286
 */

module.exports = db;