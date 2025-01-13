const logger = require('../config/logger');

// Middleware para logar todas as requisições
const logMiddleware = (req, res, next) => {
    const { method, url, headers, query, body } = req;
    logger.info({
        method,
        url,
        headers,
        query,
        body,
    });
    next();
};

module.exports = logMiddleware;
