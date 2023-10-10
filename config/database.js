require('dotenv').config();
module.exports = 
{
  development: {
    username: 'root',
    password: '',
    database: 'node_biblioteca',
    host:     'localhost', // el nombre de mi servicio en mi archivo docker-compose
    dialect:  'mysql',
    port: 3306,
    define: {
      // timestamps: false
      // Genera claves foreaneas, del tipo, user_id, en vez de userId
      undescored: true,
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host:     '127.0.0.1',
    dialect:  'mysql',
    define: {
      // timestamps: false
      // Genera claves foreaneas, del tipo, user_id, en vez de userId
      undescored: true,
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host:     process.env.DB_HOST    ,
    dialect:  process.env.DB_DIALECT ,
    port:     process.env.DB_PORT,
    define: {
      // timestamps: false
      // Genera claves foreaneas, del tipo, user_id, en vez de userId
      undescored: true,
    },
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    },
  }
}