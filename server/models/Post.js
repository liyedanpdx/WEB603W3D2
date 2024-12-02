const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
