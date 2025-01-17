const mongoose = require('mongoose');

// Definição dos schemas de itens de orçamento, endereço e checkout
const orcamentoItemSchema = new mongoose.Schema({
    orc_Produto_ID: { type: Number, required: true },
    orc_Produto_Nome: { type: String, required: true },
    orc_Produto_quantidade: { type: Number, required: true },
    orc_Produto_unidade: { type: String, required: true },
    orc_Produto_portaria: { type: String, required: false }
});

const enderecoSchema = new mongoose.Schema({
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    cidade: { type: String, required: true },
    complemento: { type: String, required: false },
    endereco: { type: String, required: true },
    estado: { type: String, required: true },
    numero: { type: String, required: true },
    tipoFrete: { type: String, required: true }
});

const checkoutSchema = new mongoose.Schema({
    orcamentoFinal: {
        checkout: { type: String, required: true },
        dataFim: { type: String, required: true },
        dadosPessoais: {
            nomeCompleto: { type: String, required: true },
            cpf: { type: String, required: true },
            rg: { type: String, required: false },
            celular: { type: String, required: true },
            email: { type: String, required: false }
        },
        enderecoEntrega: { type: enderecoSchema, required: false, default: null },
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
    },
    status: { type: String, required: true },
    dataCompra: { type: Date, required: true },
    numero_orcamento: { type: String, required: true }
});

// Emitir eventos via WebSocket ao salvar, atualizar ou remover checkouts
checkoutSchema.post('save', function(doc) {
    const io = global.io; // Certifique-se de que `global.io` está configurado
    if (io) {
        io.emit('newCheckout', doc);
    }
});

checkoutSchema.post('findOneAndUpdate', async function() {
    const io = global.io;
    if (io) {
        const updatedDoc = await this.model.findById(this.getQuery()._id);
        io.emit('checkoutUpdated', updatedDoc);
    }
});

checkoutSchema.post('remove', function(doc) {
    const io = global.io;
    if (io) {
        io.emit('checkoutRemoved', { message: 'Checkout removido', checkoutId: doc._id });
    }
});

const Checkout = mongoose.model('Checkout', checkoutSchema, 'carrinho');

module.exports = Checkout;
