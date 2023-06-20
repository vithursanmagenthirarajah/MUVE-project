const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST /tasks - Add a new task
router.post('/tasks', async (req, res) => {
  try {
    console.log(req.body)
    const { companyName, name, date, tasks, taskDueDate, taskStatus } = req.body;

    // Create a new task
    const newTask = new Task({
      companyName :companyName,
      name:name,
      date:date,
      tasks:tasks,
      taskDueDate:taskDueDate,
      taskStatus:taskStatus
    });

    // Save the new task to the database
    await newTask.save();

    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the task' });
  }
});

// Get all tasks with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  try {
    const tasks = await Task.find().skip(skip).limit(limit);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks.' });
  }
});

// Get task details by ID
router.get('getbyid/:id', async (req, res) => {
  const taskId = req.params.id;
  
  try {
    const task = await Task.findById(taskId);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve task details.' });
  }
});

// Filter tasks by due date
router.get('/filter', async (req, res) => {
  const dueDate = req.query.dueDate;
  
  try {
    const tasks = await Task.find({ taskDueDate: dueDate });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to filter tasks by due date.' });
  }
});

// Search tasks by character/s
router.get('/search', async (req, res) => {
  const searchQuery = req.query.name;
  console.log(req.query.name)
  
  try {
    const tasks = await Task.find({ name: { $regex: searchQuery, $options: 'i' } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search for tasks.' });
  }
});

module.exports = router;
