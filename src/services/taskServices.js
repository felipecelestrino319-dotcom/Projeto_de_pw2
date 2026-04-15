// Importa a função que esta alocada no Model responsavel por estruturar o objeto da tarefa
const { createTask } = require('../models/taskModels');

// Banco de dados temporário, é apenas para quando o servidor estiver rodando
let tasks = []; 

// Contador para garantir que cada tarefa tenha um ID único e na ordem de criação
let idCounter = 1;

/**
 * Adiciona uma nova tarefa
 * @param {string} title
 */

// serve para ciriar as tarefas
const addTask = (title) => {
    // Chama o Model passando o ID atual e aumenta 1 para o proximo ID
    const task = createTask(idCounter++, title, false); 
    
    // Adiciona o objeto criado ao nosso "banco de dados"
    tasks.push(task);
    
    // Retorna a tarefa criada para que o Controller possa enviá-la pelo API
    return task;
};


 //Retorna todas as tarefas armazenadas
const getTasks = () => tasks;

//Param é o parametro de uma função
/**
 * Atualiza uma tarefa existente
 * @param {number|string} id ID da tarefa a ser alterada
 * @param {object} data Objeto contendo os campos a atualizar
 */
const updateTask = (id, data) => {
    // Procura a tarefa no array. O "==" permite comparar string com número o número do ID
    const task = tasks.find(t => t.id == id);
    
    // Se não encontrar a tarefa, retorna null para o Controller tratar o erro 404(rota não encontrada)
    if (!task) return null;
    
    // Se o título foi enviado no corpo da requisição, atualiza
    if (data.title !== undefined) task.title = data.title;
    
    // Se o status "completed" foi enviado, atualiza
    if (data.completed !== undefined) task.completed = data.completed;
    
    return task;
};


 //Busca uma única tarefa pelo ID
const getTaskById = (id) => {
    return tasks.find(t => t.id == id);
};

/**
 * Remove uma tarefa do array
 * @param {number|string} id - ID da tarefa a ser removida
 */
const deleteTask = (id) => {
    // Encontra a posição da tarefa no array
    const index = tasks.findIndex(t => t.id == id);
    
    // Se o findIndex retornar -1, significa que o ID não existe
    if (index === -1) return false;
    
    // Remove 1 item a partir da posição encontrada
    tasks.splice(index, 1); 
    
    // Retorna true para confirmar que a exclusão deu certo
    return true;
};

// Exporta todas as funções para que o Controller possa utilizá-las
module.exports = { 
    addTask, 
    getTasks, 
    updateTask, 
    getTaskById,
    deleteTask
};
