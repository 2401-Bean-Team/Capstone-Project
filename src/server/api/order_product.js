const express = require('express');
const cartRouter = express.Router();
const { addProduct, deleteCartSingle, deleteCart, updateQuantity } = require('../db/order_product')

cartRouter.post('/:productId', async(req, res, next) => {
    try {
      const { orderId, productId, quantity } = req.body;
      const newItem = await addProduct({ orderId, productId, quantity });
        res.send(newItem)
      } catch(err) {
      next(err);
    }
  });

cartRouter.delete( '/:orderId/product/:productId', async(req, res, next) => {
    try {
      const { orderId, productId } = req.body;  
      const cart = await deleteCartSingle({ orderId, productId });      
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

  cartRouter.delete( '/:orderId', async(req, res, next) => {
    try {
      const cart = await deleteCart(orderId);
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

  cartRouter.put('/:orderId/quantity' , async(req, res, next) => {
    try {
      const cart = await updateQuantity({ orderId, productId })
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

module.exports = cartRouter
  // do we need a check out?