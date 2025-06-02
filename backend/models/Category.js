const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
  // user null = categoría global (predefinida)
});

module.exports = mongoose.model('Category', categorySchema);
