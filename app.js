// Importa o módulo nativo 'http' do Node.js para criar o servidor
const http = require('http');

// Importa o seu arquivo de rotas que contém a lógica de "para onde vai cada pedido"
const taskRoutes = require('./src/routes/taskRoutes');

// Cria o servidor propriamente dito
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    taskRoutes(req, res);
});

// Define a porta onde o servidor vai "escutar"
const PORT = 3000;

// Liga o servidor e deixa ele aguardando conexões
server.listen(PORT, () => {
    // Esta mensagem aparece no seu terminal assim que você digita 'node app.js' e  servidor começa a rodar
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});