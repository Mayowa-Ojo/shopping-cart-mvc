const express = require('express');
const product = require('../models/product');

const router = express.Router();

/* routes */
/* get all products */
router.get('/', async (req, res) => {
  try {
    const products = await product.find();
    res.render('index', { 
      products 
    });
  } catch(err) {
    res.status(500).json({message: err.message})
  }
  // res.render('index');
});

/* add product */
// router.post

module.exports = router;
