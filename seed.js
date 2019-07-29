const mongoose = require('mongoose');
const data = require('./public/assets/seeds/products');
const Product = require('./models/product');
// const env = require('dotenv');

// env.config();
// mongoose.connection()
mongoose.connect(process.env.DATABASE_URL, ({ useNewUrlParser: true }));

module.exports = function seedDB() {
  data.forEach(async obj => {
    const product = new Product(obj);
    try {
      await product.save();
      console.log('done');
    } catch(err) {
      console.log(err.message);
    }
  });
}
