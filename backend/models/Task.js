const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  companyName: String,
  name: String,
  date: String,
  tasks: String,
  taskDueDate: String,
  taskStatus: String
});

module.exports = mongoose.model('Task', taskSchema);