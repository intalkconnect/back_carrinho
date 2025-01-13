// controllers/checkoutController.js
const Checkout = require('../models/checkoutModel'); // Modelo do checkout

// Função para buscar checkouts com status "confirmed" e campos específicos
const getCheckouts = async (req, res) => {
    try {
        // Filtro para o status "confirmed"
        const filtro = {
            status: 'confirmed'
        };

        // Projeção dos campos que queremos retornar
        const camposProjecao = {
            status: 1,
            dataCriacao: 1,
            dataFim: 1,
            dataCompra: 1,
            orcamentoFinal: 1,
            numero_orcamento: 1
        };

        // Busca no banco de dados com os filtros e campos projetados
        const checkouts = await Checkout.find(filtro, camposProjecao);

        if (!checkouts || checkouts.length === 0) {
            return res.status(404).json({ message: 'Nenhum checkout encontrado' });
        }

        // Retorna os checkouts encontrados
        return res.status(200).json(checkouts);
    } catch (error) {
        console.error('Erro ao buscar checkouts:', error);
        return res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
};

module.exports = { getCrud };
