// esto no depende de express
const winston = require('winston');
const { combine, timestamp, json } = format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    // creara un archivo llamado error.log solo para los logs de tipo error
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // creara un combined.log todos los logs convinanado lo de error y no error
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// este if es para hacer que si no estamos en produccion muestre los logs en consola, esto es para no hacer crecer esos archivos de log sin necesidad
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
      format: winston.format.simple(),
  }));
}

module.exports = function buildLogger(service) {
  return {
      log: (message) => {
          logger.log('info', {message, service})
      },
      error: (message) => {
          logger.log('error', {
              message,
              service
          })
      },
  }
}