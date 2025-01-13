// controllers/checkoutController.js
const checkoutService = require('../services/checkoutService');

const finishCheckout = async (req, res) => {
    try {
        const { checkout, dataFim, dadosPessoais, enderecoEntrega, localRetirada, formaPagamento, produtos, frete, total } = req.body;

        const updatedCheckout = await checkoutService.processCheckout(
            checkout, dataFim, dadosPessoais, enderecoEntrega, localRetirada, formaPagamento, produtos, frete, total
        );

        res.status(200).json({ message: 'Checkout processado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o checkout.' });
    }
};

const getCheckoutsController = async (req, res) => {
    try {
        // Chama a função para buscar os checkouts
        const checkouts = await checkoutService.getCheckouts();

        console.log("Checkouts encontrados:", checkouts);

        // Retorna os checkouts encontrados
        return res.status(200).json(checkouts);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao processar a solicitação', message: error.message });
    }
};


module.exports = {
    finishCheckout,
    getCheckoutsController
};
