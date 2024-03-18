// routes/coffee.js
const express = require('express');
const coffeeRouter = express.Router();
const { getProducts, getProductById } = require('../db/product');

// /api/coffee routes
coffeeRouter.get('/', async (req, res, next) => {
  try {
    const coffee = await getProducts();
    res.send(coffee);
  } catch(err) {
    next(err);
  }
});

// /api/coffee/:productId
coffeeRouter.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const coffee = await getProductById(productId);
    if (!coffee) {
      res.status(404).send('No coffee found.');
    } else {
      res.send(coffee);
    }
  } catch(err) {
    next(err);
  }
});

module.exports = coffeeRouter;