const axios = require('axios');
const logger = require('../config/logger');

const asaasPaymentsBaseUrl = 'https://sandbox.asaas.com/api/v3/payments';

// Função para buscar pagamentos por QR Code
const getPaymentByPixQrCode = async (pixQrCode, accessToken) => {
    try {
        const response = await axios.get(`${asaasPaymentsBaseUrl}/${pixQrCode}/pixQrCode`, {
            headers: { access_token: accessToken },
        });
        logger.info({
            action: 'GET /payments',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'GET /payments',
            error: error.message,
        });
        throw error;
    }
};

// Função para buscar pagamentos por status
const getPaymentByStatus = async (status, accessToken) => {
    try {
        const response = await axios.get(`${asaasPaymentsBaseUrl}/${status}/status`, {
            headers: { access_token: accessToken },
        });
        logger.info({
            action: 'GET /payments',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'GET /payments',
            error: error.message,
        });
        throw error;
    }
};

// Função para excluir pagamento
const deletePaymentById = async (id, accessToken) => {
    try {
        const response = await axios.delete(`${asaasPaymentsBaseUrl}/${id}`, {
            headers: { access_token: accessToken },
        });
        logger.info({
            action: 'DELETE /payments',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'DELETE /payments',
            error: error.message,
        });
        throw error;
    }
};

// Função para criar um novo pagamento
const createPayment = async (body, accessToken) => {
    try {
        const response = await axios.post(asaasPaymentsBaseUrl, body, {
            headers: { access_token: accessToken },
        });
        logger.info({
            action: 'POST /payments',
            status: response.status,
            data: response.data,
        });
        return response.data;
    } catch (error) {
        logger.error({
            action: 'POST /payments',
            error: error.message,
        });
        throw error;
    }
};

module.exports = { getPaymentByPixQrCode, getPaymentByStatus, deletePaymentById, createPayment };
