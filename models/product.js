const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true
  },
  img_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);