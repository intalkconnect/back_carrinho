const mongoose = require('mongoose');
const logger = require('./logger');  // Assume que você tem um arquivo de log configurado

const mongoURI = 'mongodb://mongo:Alice120212@95.217.239.32:27017/blip_lantana?authSource=admin&tls=false';

/**
 * Função assíncrona para conectar ao MongoDB
 */
const connectToDatabase = async () => {
    try {
        // Tentando conectar ao MongoDB com a URI fornecida
        await mongoose.connect(mongoURI, {
            autoIndex: false,        // Evitar a criação automática de índices, caso você controle isso manualmente
        });

        // Logando no sucesso da conexão
        logger.info('Connected to MongoDB successfully');
    } catch (error) {
        // Logando erro detalhado, caso a conexão falhe
        logger.error('Error connecting to MongoDB', error);

        // Finalizando a aplicação, pois a conexão é essencial
        process.exit(1);
    }
};

// Exportando a função para que possa ser chamada em outros arquivos
module.exports = connectToDatabase;
