const mongoose = require('mongoose');

// Esquema do Carrinho
const orcamento = new mongoose.Schema({
    orcamento: Array,
    dataCriacao: String,
    dataFim: String,
    status: String,
    inserido: Boolean,
    numero_orcamento: String,
    dataCompra: Date,
    orcamentoFinal: Object,
});

// Nome do modelo será "Carrinho" e usará a coleção "carrinho"
module.exports = mongoose.model('Carrinho', orcamento, 'carrinho');
