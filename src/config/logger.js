const winston = require('winston');

// Configuração de logs com Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'requests.log' })
    ],
});

module.exports = logger;
