const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();
const router = express.Router(); // Criar uma instância de roteador

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para habilitar o parsing de JSON

// Defina o modelo Task
const Task = mongoose.model('Task', new mongoose.Schema({
  title: String,
  description: String,
}));

// Rota para buscar todas as tarefas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Rota para criar uma nova tarefa
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Rota para atualizar uma tarefa existente
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Rota para excluir uma tarefa
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

// Use o roteador
app.use('/', router);

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Inicializar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
