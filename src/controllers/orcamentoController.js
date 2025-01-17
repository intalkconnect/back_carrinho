const orcamentoService = require('../services/orcamentoService');

// Função para o endpoint GET /orcamento/:id
const getOrcamentoById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' });
    }

    try {
        const orcamento = await orcamentoService.getOrcamentoById(id);

        if (!orcamento) {
            return res.status(404).json({ error: 'Orçamento não encontrado' });
        }

        res.json(orcamento); // Retorna o documento encontrado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Função para o endpoint POST /orcamento
const createOrcamento = async (req, res) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    try {
        const orcamentoId = await orcamentoService.createOrcamento(body);
        res.status(201).json({ id: orcamentoId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating orcamento: ' + error.message });
    }
};

module.exports = { getOrcamentoById, createOrcamento };
