const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task');
require("dotenv").config()

var cors = require('cors')



// Create Express app
const app = express();

// MongoDB connection

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true ,dbName: "TaskDB"});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//
app.use(cors())


// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


