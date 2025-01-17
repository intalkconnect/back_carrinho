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
        const filtro = {
            status: "confirmed",
            process: false,
        };

        // Projeção dos campos que queremos retornar
        const camposProjecao = {
            status: 1,
            dataCriacao: 1,
            dataFim: 1,
            dataCompra: 1,
            orcamentoFinal: 1,
            numero_orcamento: 1,
        };

        // Busca no banco de dados com os filtros e campos projetados
        const checkouts = await Checkout.find(filtro, camposProjecao);

        if (!checkouts || checkouts.length === 0) {
            throw new Error("Nenhum checkout encontrado");
        }

        // Formatação do retorno
        const formattedCheckouts = checkouts.map((checkout) => ({
            _id: checkout._id.toString(), // Converte ObjectId para string
            dataCriacao: checkout.dataCriacao,
            dataFim: checkout.dataFim,
            status: checkout.status,
            numero_orcamento: checkout.numero_orcamento,
            dataCompra: checkout.dataCompra,
            orcamentoFinal: {
                checkout: checkout._id.toString(),
                dataFim: checkout.orcamentoFinal?.dataFim,
                dadosPessoais: {
                    nomeCompleto: checkout.orcamentoFinal?.dadosPessoais?.nomeCompleto,
                    cpf: checkout.orcamentoFinal?.dadosPessoais?.cpf,
                    rg: checkout.orcamentoFinal?.dadosPessoais?.rg || "",
                    celular: checkout.orcamentoFinal?.dadosPessoais?.celular,
                    email: checkout.orcamentoFinal?.dadosPessoais?.email || "",
                },
                enderecoEntrega: {
                    endereco: checkout.orcamentoFinal?.enderecoEntrega?.endereco,
                    numero: checkout.orcamentoFinal?.enderecoEntrega?.numero,
                    complemento: checkout.orcamentoFinal?.enderecoEntrega?.complemento,
                    bairro: checkout.orcamentoFinal?.enderecoEntrega?.bairro,
                    cidade: checkout.orcamentoFinal?.enderecoEntrega?.cidade,
                    estado: checkout.orcamentoFinal?.enderecoEntrega?.estado,
                    cep: checkout.orcamentoFinal?.enderecoEntrega?.cep,
                    tipoFrete: checkout.orcamentoFinal?.enderecoEntrega?.tipoFrete,
                },
                localRetirada: checkout.orcamentoFinal?.localRetirada || null,
                formaPagamento: checkout.orcamentoFinal?.formaPagamento,
                produtos: checkout.orcamentoFinal?.produtos.map((produto) => ({
                    orc_filial: produto.orc_filial,
                    orc_numero: produto.orc_numero,
                    orc_serie: produto.orc_serie,
                    orc_valor_liquido: produto.orc_valor_liquido,
                    orc_volume: produto.orc_volume,
                    orc_Volume_Unidade: produto.orc_Volume_Unidade,
                    orc_qt_potes: produto.orc_qt_potes,
                    orc_forma_farmac: produto.orc_forma_farmac,
                    orcamentoItens: produto.orcamentoItens.map((item) => ({
                        orc_Produto_ID: item.orc_Produto_ID,
                        orc_Produto_Nome: item.orc_Produto_Nome,
                        orc_Produto_quantidade: item.orc_Produto_quantidade,
                        orc_Produto_unidade: item.orc_Produto_unidade,
                        orc_Produto_portaria: item.orc_Produto_portaria || null,
                    })),
                    orcamentoSugestoesPreco: produto.orcamentoSugestoesPreco || null,
                })),
                frete: checkout.orcamentoFinal?.frete,
                total: checkout.orcamentoFinal?.total,
            },
        }));

        return formattedCheckouts;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    processCheckout,
    getCheckouts,
};
