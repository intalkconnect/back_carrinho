// services/checkoutService.js
const Checkout = require('../models/checkoutModel');  // Certifique-se de ter o modelo de Checkout

// Função para ajustar a data para o fuso horário GMT-3 e retornar no formato ISO
const adjustToGMT3ISO = (date) => {
    const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas para GMT-3
    return adjustedDate.toISOString(); // Converte para o formato ISO
};

// Função que processa o checkout e insere no banco
const processCheckout = async (checkoutId, dataFim, dadosPessoais, enderecoEntrega, localRetirada, formaPagamento, produtos, frete, total) => {
    try {
        // Verifica se o checkout já existe no banco
        const checkout = await Checkout.findById(checkoutId);

        if (!checkout) {
            throw new Error('Checkout não encontrado');
        }

        // Cria o novo objeto de orcamentoFinal
        const orcamentoFinal = {
            checkout: checkoutId,
            dataFim,
            dadosPessoais,
            enderecoEntrega,
            localRetirada,
            formaPagamento,
            produtos,
            frete,
            total
        };

        // Obtém a data atual e ajusta para GMT-3
        const now = new Date(); // Obtém a data atual em GMT
        const adjustedDate = adjustToGMT3ISO(now); // Ajusta para GMT-3

        // Atualiza o checkout com status e data de compra
        const updatedCheckout = await Checkout.findByIdAndUpdate(
            checkoutId,
            {
                $set: {
                    orcamentoFinal,
                    status: 'confirmed',
                    dataCompra: adjustedDate
                }
            },
            { new: true } // Retorna o documento atualizado
        );

        return updatedCheckout;
    } catch (error) {
        throw error;
    }
};

const getCheckouts = async () => {
    try {
        // Filtro para o status "confirmed"
        const filtro = { status: 'confirmed' };

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
            throw new Error('Nenhum checkout encontrado');
        }

        return checkouts;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    processCheckout,
    getCheckouts,
};
