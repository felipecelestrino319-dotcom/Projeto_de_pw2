
//Estrutura os objetos das tarefas
const createTask = (id, title, completed = false) => {
    console.log("Model foi chamado para: ", title);
    return {
        id,
        title,
        completed
    };
};

// Retorna os objetos que foram retornados da função
module.exports = { 
    createTask 
};