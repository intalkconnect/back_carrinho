const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const customerController = require('./controllers/customerController');
const paymentController = require('./controllers/paymentController');
const orcamentoController = require('./controllers/orcamentoController');
const freteController = require('./controllers/freteController');
const checkoutController = require('./controllers/checkoutController');

const logMiddleware = require('./middlewares/logMiddleware');
const connectToDatabase = require('./config/db');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Torna a instância do io globalmente acessível
global.io = io;

// Conecta ao banco de dados MongoDB
connectToDatabase();

app.use(cors());
app.use(express.json());

// Middleware para logar todas as requisições
app.use(logMiddleware);

// Configuração do Socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado via Socket.io');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Endpoints
app.get('/customers', customerController.getCustomer);
app.post('/customers', customerController.createCustomer);
app.get('/payments', paymentController.getPaymentByPixQrCode);
app.get('/payments', paymentController.getPaymentByStatus);
app.delete('/payments/:id', paymentController.deletePaymentById);
app.post('/payments', paymentController.createPayment);
app.get('/orcamento', orcamentoController.getOrcamentoById);
app.post('/orcamento', orcamentoController.createOrcamento);
app.get('/frete', freteController.calcularFrete);
app.post('/finish-checkout', checkoutController.finishCheckout);
app.get('/itens', checkoutController.getCheckoutsController);

// Inicialização do servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
