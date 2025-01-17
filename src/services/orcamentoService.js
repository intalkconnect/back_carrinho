const mongoose = require('mongoose');
const { addHours } = require('date-fns');

const OrcamentoModel = require('../models/orcamentoModel');

const adjustToGMT3ISO = (date) => {
    const adjustedDate = new Date(date.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas para GMT-3
    return adjustedDate.toISOString(); // Converte para o formato ISO
};

// Função para buscar orçamento pelo _id
const getOrcamentoById = async (orcamentoId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orcamentoId)) {
            throw new Error('ID inválido');
        }

        const orcamento = await OrcamentoModel.findById(orcamentoId);

        if (!orcamento) {
            throw new Error('Orçamento não encontrado');
        }

        return orcamento;
    } catch (error) {
        return[]
    }
};

// Função para criar um novo orçamento
const createOrcamento = async (body) => {
    try {
        if (!Array.isArray(body) || body.length === 0) {
            throw new Error('O corpo da requisição está vazio ou inválido.');
        }

        // Cria as datas ajustadas para o fuso horário GMT-3
        const now = new Date();
        const dataCriacao = adjustToGMT3ISO(now); // Ajusta para GMT-3
        const dataFim = adjustToGMT3ISO(addHours(now, 24)); // Adiciona 24 horas e ajusta para GMT-3

        // Extraindo o número do orçamento do primeiro item do body
        const numeroOrcamento = body[0]?.orc_numero;

        if (!numeroOrcamento) {
            throw new Error('Número do orçamento (orc_numero) não encontrado no corpo da requisição.');
        }

        const novoOrcamento = new OrcamentoModel({
            orcamento: body,
            dataCriacao,
            dataFim,
            status: 'pending',
            process: false,
            numero_orcamento: numeroOrcamento,
            orcamentoFinal: {},
        });

        await novoOrcamento.save();

        return novoOrcamento._id;
    } catch (error) {
        throw new Error('Erro ao criar orçamento: ' + error.message);
    }
};

module.exports = { getOrcamentoById, createOrcamento };
