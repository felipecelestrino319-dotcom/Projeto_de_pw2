const taskController = require('../controllers/taskController');

module.exports = (req, res) => {
    const url = req.url.split('?')[0];
    const method = req.method;

    // GET /tasks - Listar todas
    if ((url === '/tasks' || url === '/tasks/') && method === 'GET') {
        return taskController.listTask(req, res);
    }

    // GET /tasks/:id - Buscar por ID
    if (url.startsWith('/tasks/') && method === 'GET') {
        const id = url.split('/')[2];
        return taskController.getTaskById(req, res, id);
    }

    // POST - Criar
    if (url === '/tasks' && method === 'POST') {
        return taskController.createTask(req, res);
    }

    // PUT /tasks/:id - Atualizar
    if (url.startsWith('/tasks/') && method === 'PUT') {
        const id = url.split('/')[2];
        return taskController.updateTask(req, res, id);
    }

    // DELETE /tasks/:id - Deletar
    if (url.startsWith('/tasks/') && method === 'DELETE') {
        const id = url.split('/')[2];
        return taskController.deleteTask(req, res, id);
    }

    // 404 - Rota não encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};