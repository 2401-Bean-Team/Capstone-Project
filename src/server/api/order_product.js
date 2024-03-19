const express = require('express');
const cartRouter = express.Router();
const { addProduct, deleteCartSingle, deleteCart, updateQuantity } = require('../db/order_product')

cartRouter.get('/:productId', async(req, res, next) => {
  try {
    const cart = await addProduct();
    res.send(cart)
  } catch(err) {
    next(err);
  }
});

cartRouter.delete( , async(req, res, next) => {
    try {
      const cart = await deleteCartSingle();
    } catch(err) {
      next(err);
    }
  });

  cartRouter.delete( , async(req, res, next) => {
    try {
      const cart = await deleteCart();
    } catch(err) {
      next(err);
    }
  });

  cartRouter.get( , async(req, res, next) => {
    try {
      const cart = await updateQuantity
    } catch(err) {
      next(err);
    }
  });


  // do we need a check out?