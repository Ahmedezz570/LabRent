const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolId: String,
  name: String,
  category: String,
  description: String,
  location: String,
  status: {
    type: String,
    enum: ['Available', 'In Use', 'Maintenance'], 
    default: 'Available'
  }
});

module.exports = mongoose.model('Tool', toolSchema);
