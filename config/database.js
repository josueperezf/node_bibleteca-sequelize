module.exports = 
{
  development: {
    username: 'root',
    password: '',
    database: 'biblioteca_sequelize',
    host:     'localhost',
    dialect:  'mysql',
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
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'biblioteca_sequelize',
    host:     process.env.DB_HOST     || 'localhost',
    dialect:  process.env.DB_DIALECT  || 'mysql',
    define: {
      // timestamps: false
      // Genera claves foreaneas, del tipo, user_id, en vez de userId
      undescored: true,
    }
  }
}