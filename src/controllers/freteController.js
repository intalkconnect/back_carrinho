// src/controllers/freteController.js
const freteService = require('../services/freteService');

async function calcularFrete(req, res) {
    const cep = req.query.cep; // O CEP será passado via query
    if (!cep) {
        return res.status(400).json({ error: "CEP é necessário" });
    }

    try {
        // Chama o serviço para calcular o frete
        const result = await freteService.calcularFrete(cep);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { calcularFrete };
