// src/services/freteService.js
const axios = require('axios');

// Função para buscar o preço do frete baseado no CEP
function findPrice(cep, ranges) {
    const numericCep = parseInt(cep.replace("-", ""), 10);

    for (const [start, end, price] of ranges) {
        if (numericCep >= parseInt(start, 10) && numericCep <= parseInt(end, 10)) {
            return price;
        }
    }
    return null;
}

// Listas de preços por faixa de CEP
const sedex = [
    ["30000000", "31999999", 13.50],
    ["32000000", "32399999", 18.90],
    ["32600000", "32699999", 26.90],
    ["34000000", "34019999", 26.90],
    ["32400000", "32499999", 26.60],
    ["32700000", "33999999", 30.00],
    ["34020000", "39999999", 30.00],
    ["70000000", "73499999", 47.00],
    ["20000000", "28999999", 47.00],
    ["1000000", "19999999", 47.00],
    ["72800000", "76799999", 58.00],
    ["79000000", "79999999", 58.00],
    ["80000000", "87999999", 58.00],
    ["29000000", "29999999", 58.00],
    ["40000000", "48999999", 58.00],
    ["88000000", "89999999", 58.00],
    ["78000000", "78899999", 69.00],
    ["90000000", "99999999", 69.00],
    ["57000000", "57999999", 78.50],
    ["60000000", "63999999", 78.50],
    ["65000000", "65999999", 78.50],
    ["58000000", "58999999", 78.50],
    ["50000000", "56999999", 78.50],
    ["49000000", "49999999", 78.50],
    ["66000000", "68899999", 78.50],
    ["77000000", "77999999", 78.50],
    ["64000000", "64999999", 78.50],
    ["69000000", "69899999", 78.50],
    ["76800000", "76999999", 78.50],
    ["59000000", "59999999", 78.50],
    ["68900000", "69999999", 78.50],
    ["69300000", "69399999", 78.50]
];

const pac = [
    ["30000000", "31999999", 13.50],
    ["32000000", "32399999", 18.90],
    ["32600000", "32699999", 26.90],
    ["34000000", "34019999", 26.90],
    ["32400000", "32499999", 26.60],
    ["32700000", "33999999", 25.90],
    ["34020000", "39999999", 25.90],
    ["70000000", "73499999", 30.00],
    ["20000000", "28999999", 30.00],
    ["1000000", "19999999", 30.00],
    ["72800000", "76799999", 35.00],
    ["79000000", "79999999", 35.00],
    ["80000000", "87999999", 35.00],
    ["29000000", "29999999", 35.00],
    ["40000000", "48999999", 35.00],
    ["88000000", "89999999", 35.00],
    ["78000000", "78899999", 45.00],
    ["90000000", "99999999", 45.00],
    ["57000000", "57999999", 54.50],
    ["60000000", "63999999", 54.50],
    ["65000000", "65999999", 54.50],
    ["58000000", "58999999", 54.50],
    ["50000000", "56999999", 54.50],
    ["49000000", "49999999", 54.50],
    ["66000000", "68899999", 54.50],
    ["77000000", "77999999", 54.50],
    ["64000000", "64999999", 54.50],
    ["69000000", "69899999", 54.50],
    ["76800000", "76999999", 54.50],
    ["59000000", "59999999", 54.50],
    ["68900000", "69999999", 54.50],
    ["69300000", "69399999", 54.50]
];

// Função principal de cálculo de frete
async function calcularFrete(cep) {
    try {
        // Consulta o ViaCEP para obter o endereço
        const { data: cepData } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (cepData.erro) {
            throw new Error("CEP inválido");
        }

        const inputCity = cepData.localidade; // Cidade do CEP
        const localPrice = {
            "Belo Horizonte": 13.50,
            "Contagem": 18.90,
            "Betim": 27.90,
            "Nova Lima": 27.90,
            "Ibirité": 27.90
        }[inputCity] || null;

        // Buscar preços para PAC e Sedex
        let pacPrice = findPrice(cep, pac);
        let sedexPrice = findPrice(cep, sedex);

        // Se a cidade for encontrada na lista de cidades locais, desconsiderar PAC e Sedex
        if (localPrice !== null) {
            pacPrice = null;
            sedexPrice = null;
        }

        return {
            ...cepData,
            pac: pacPrice !== null ? pacPrice.toFixed(2) : "",
            sedex: sedexPrice !== null ? sedexPrice.toFixed(2) : "",
            local: localPrice !== null ? localPrice.toFixed(2) : ""
        };
    } catch (error) {
        throw new Error("Erro ao calcular o frete: " + error.message);
    }
}

module.exports = { calcularFrete };
