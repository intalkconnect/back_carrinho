const axios = require('axios');
const logger = require('../config/logger');

const asaasBaseUrl = 'https://sandbox.asaas.com/api/v3/customers';

// Função para buscar cliente usando o CPF/CNPJ
const getCustomerByCpfCnpj = async (cpfCnpj, accessToken) => {
    try {
        const response = await axios.get(asaasBaseUrl, {
            headers: { access_token: accessToken },
            params: { cpfCnpj },
        });
        logger.info({
            action: 'GET /customers',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'GET /customers',
            error: error.message,
        });
        throw error;
    }
};

// Função para criar um novo cliente
const createCustomer = async (body, accessToken) => {
    try {
        const response = await axios.post(asaasBaseUrl, body, {
            headers: { access_token: accessToken },
        });
        logger.info({
            action: 'POST /customers',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'POST /customers',
            error: error.message,
        });
        throw error;
    }
};

module.exports = { getCustomerByCpfCnpj, createCustomer };
