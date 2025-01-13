const customerService = require('../services/customerService');

// Função para o endpoint GET /customers
const getCustomer = async (req, res) => {
    const { cpfCnpj } = req.query;
    const accessToken = req.headers['access_token'];

    if (!cpfCnpj || !accessToken) {
        return res.status(400).json({ error: 'cpfCnpj and access_token are required' });
    }

    try {
        const customerData = await customerService.getCustomerByCpfCnpj(cpfCnpj, accessToken);
        res.json(customerData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

// Função para o endpoint POST /customers
const createCustomer = async (req, res) => {
    const accessToken = req.headers['access_token'];
    const body = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'access_token is required' });
    }

    try {
        const customerData = await customerService.createCustomer(body, accessToken);
        res.json(customerData);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

module.exports = { getCustomer, createCustomer };
