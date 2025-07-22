// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

// Initialize express app
const app = express();

// Middlewares to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB (we will run MongoDB in Docker later)
// For now, this will not connect, but we will fix it later with Docker
mongoose.connect('mongodb://mongo-container:27017/mern_db', {
           
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});


app.get('/add-note', async (req, res) => {
  const note = new Note({ title: 'Test Note', content: 'This is a test.' });
  await note.save();
  res.send('Note added to MongoDB!');
});

// Route to fetch all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Start server on port 6000
const PORT = 5005;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
