const paymentService = require('../services/paymentService');

// Função para o endpoint GET /payments (por pixQrCode)
const getPaymentByPixQrCode = async (req, res) => {
    const { pixQrCode } = req.query;
    const accessToken = req.headers['access_token'];

    if (!pixQrCode || !accessToken) {
        return res.status(400).json({ error: 'pixQrCode and access_token are required' });
    }

    try {
        const paymentData = await paymentService.getPaymentByPixQrCode(pixQrCode, accessToken);
        res.json(paymentData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

// Função para o endpoint GET /payments (por status)
const getPaymentByStatus = async (req, res) => {
    const { status } = req.query;
    const accessToken = req.headers['access_token'];

    if (!status || !accessToken) {
        return res.status(400).json({ error: 'status and access_token are required' });
    }

    try {
        const paymentData = await paymentService.getPaymentByStatus(status, accessToken);
        res.json(paymentData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

// Função para o endpoint DELETE /payments
const deletePaymentById = async (req, res) => {
    const { id } = req.params;
    const accessToken = req.headers['access_token'];

    if (!id || !accessToken) {
        return res.status(400).json({ error: 'id and access_token are required' });
    }

    try {
        const paymentData = await paymentService.deletePaymentById(id, accessToken);
        res.json(paymentData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

// Função para o endpoint POST /payments
const createPayment = async (req, res) => {
    const accessToken = req.headers['access_token'];
    const body = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'access_token is required' });
    }

    try {
        const paymentData = await paymentService.createPayment(body, accessToken);
        res.json(paymentData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

module.exports = { getPaymentByPixQrCode, getPaymentByStatus, deletePaymentById, createPayment };
