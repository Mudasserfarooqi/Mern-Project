const mongoose = require('mongoose');

// Define the schema (structure) for a Note
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Export a model called "Note" based on this schema
module.exports = mongoose.model('Note', noteSchema);
