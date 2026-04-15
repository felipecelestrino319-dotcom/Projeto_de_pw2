Link do video: https://youtu.be/UIfTurmP10o

Gerenciador de Tarefas – API em Node.js:
Descrição do projeto

Este projeto é uma API REST simples para gerenciar tarefas. Ele permite criar, listar, atualizar, buscar por ID e deletar tarefas. A aplicação não utiliza banco de dados externo; os dados são armazenados em memória enquanto o servidor estiver rodando. O projeto foi desenvolvido para fins de estudo sobre Node.js puro, manipulação de requisições HTTP e organização de código em Models, Services e Controllers.

Tecnologias utilizadas
Node.js – Ambiente de execução JavaScript no servidor
HTTP (módulo nativo) – Para criar o servidor
JavaScript ES6 – Estruturação do código e módulos
JSON – Para comunicação de dados via API
Instalação
Clone o repositório:
git clone https://seu-repositorio.git
Acesse a pasta do projeto:
cd nome-do-projeto
Instale as dependências (caso haja pacotes externos):
npm install

Observação: atualmente o projeto não possui dependências externas.

Execução

Para rodar o servidor:

node app.js

O servidor iniciará na porta 3000 e ficará aguardando conexões. Você verá a seguinte mensagem no terminal:

Servidor rodando em http://localhost:3000
Rotas disponíveis
GET /tasks – Retorna todas as tarefas
GET /tasks/:id – Retorna uma tarefa pelo ID
POST /tasks – Cria uma nova tarefa
PUT /tasks/:id – Atualiza uma tarefa existente
DELETE /tasks/:id – Deleta uma tarefa pelo ID

Exemplo de requisição para criar uma tarefa (usando curl):

curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Minha nova tarefa"}'
Explicação da solução

O projeto segue a arquitetura MVC (Model, View, Controller), adaptada para APIs:

Model – Estrutura o objeto da tarefa e gera IDs únicos (taskModels.js).
Service – Contém a lógica de negócio, como adicionar, atualizar, buscar e deletar tarefas (taskServices.js). Ele atua como intermediário entre Controller e Model.
Controller – Recebe as requisições HTTP, processa os dados via Service e retorna respostas ao cliente (taskController.js).
Routes – Define para qual função do Controller cada rota HTTP deve ir (taskRoutes.js).
Server – Inicializa o servidor HTTP e utiliza as rotas para tratar as requisições (app.js).

Observação: O projeto armazena os dados em memória (tasks[]). Ao reiniciar o servidor, todas as tarefas são perdidas.
