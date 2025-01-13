// models/Checkout.js
const mongoose = require('mongoose');

const orcamentoItemSchema = new mongoose.Schema({
    orc_Produto_ID: { type: Number, required: true },
    orc_Produto_Nome: { type: String, required: true },
    orc_Produto_quantidade: { type: Number, required: true },
    orc_Produto_unidade: { type: String, required: true },
    orc_Produto_portaria: { type: String, required: false }
});

const checkoutSchema = new mongoose.Schema({
    orcamentoFinal: [{
        checkout: { type: String, required: true },
        dataFim: { type: String, required: true },
        dadosPessoais: {
            nomeCompleto: { type: String, required: true },
            cpf: { type: String, required: true },
            rg: { type: String, required: false },
            celular: { type: String, required: true },
            email: { type: String, required: false }
        },
        enderecoEntrega: { type: String, required: false },
        localRetirada: { type: String, required: true },
        formaPagamento: { type: String, required: true },
        produtos: [{
            orc_filial: { type: Number, required: true },
            orc_numero: { type: Number, required: true },
            orc_serie: { type: String, required: true },
            orc_valor_liquido: { type: Number, required: true },
            orc_volume: { type: Number, required: true },
            orc_Volume_Unidade: { type: String, required: true },
            orc_qt_potes: { type: Number, required: true },
            orc_forma_farmac: { type: String, required: true },
            orcamentoItens: [orcamentoItemSchema],
            orcamentoSugestoesPreco: { type: String, required: false }
        }],
        frete: { type: Number, required: true },
        total: { type: Number, required: true }
    }],
    status: { type: String, required: true },
    dataCompra: { type: Date, required: true }
});

const Checkout = mongoose.model('Checkout', checkoutSchema, 'carrinho');

module.exports = Checkout;
