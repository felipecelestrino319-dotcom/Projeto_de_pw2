// Importa o Service, que é quem manipula os dados
const taskService = require('../services/taskServices');

// Função que deixa o JSON próprio prar rodar no powershell
const getRequestBody = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                console.error("ERRO NO PARSE DO JSON:", e.message);
                resolve({});
            }
        });
    });
};

//Cria uma nova tarefa
const createTask = async (req, res) => {
    try {
        const body = await getRequestBody(req);
        console.log("Corpo recebido no Controller:", body);

        const title = body.title || "Tarefa Sem Título";
        
        const task = taskService.addTask(title);
        
        res.statusCode = 201;
        res.end(JSON.stringify(task));
    } catch (error) {
        console.error("Erro Crítico: ", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Erro interno no servidor" }));
    }
};

//Lista de todas as tarefas
const listTask = (req, res) => {
    const tasks = taskService.getTasks();
    res.statusCode = 200; // 200 OK
    res.end(JSON.stringify(tasks));
};

//Atualiza uma tarefa existente pelo ID
const updateTask = async (req, res, id) => {
    try {
        const body = await getRequestBody(req);
        const task = taskService.updateTask(id, body);
        
        if (!task) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
        }
        res.end(JSON.stringify(task));
    } catch (error) {
        console.error("ERRO NO UPDATE:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Erro ao atualizar" }));
    }
};

//Busca uma única tarefa pelo ID
const getTaskById = (req, res, id) => {
    const task = taskService.getTaskById(id);
    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify(task));
};

//Deleta uma tarefa pelo ID
const deleteTask = (req, res, id) => {
    try {
        const success = taskService.deleteTask(id);
        if (!success) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "Tarefa não encontrada para deletar" }));
        }
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Tarefa deletada com sucesso!" }));
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Erro ao deletar tarefa" }));
    }
};

// Exporta as funções para que o arquivo de Rotas possa usá-las
module.exports = { 
    createTask, 
    listTask, 
    updateTask, 
    getTaskById, 
    deleteTask 
};