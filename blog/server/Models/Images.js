const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Image', imageSchema);
