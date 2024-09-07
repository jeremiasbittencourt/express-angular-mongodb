const Task = require('../models/Task');

// Obter todas as tarefas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

// Criar uma nova tarefa
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

// Atualizar uma tarefa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Excluir uma tarefa
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tarefa excluída' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };