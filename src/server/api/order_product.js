const express = require('express');
const cartRouter = express.Router();
const { addProduct, deleteCartSingle, deleteCart, updateQuantity, getOrderItems } = require('../db/order_product')

const requireToken = (req, res, next) => {
  // Check if token is present in the request header or wherever you store your tokens
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).send("Unauthorized: Token is required");
  }
  // You may add further token validation logic here
  next(); // Move to the next middleware or route handler
};

// Apply requireToken middleware to relevant routes
cartRouter.use(requireToken);

cartRouter.post('/addItem', async(req, res, next) => {
    try {
      const { orderId, productId, quantity } = req.body;
      const newItem = await addProduct({ orderId, productId, quantity });
        res.send(newItem)
      } catch(err) {
      next(err);
    }
  });

cartRouter.delete( '/deleteCartItem', async(req, res, next) => {
    try {
      const { orderId, productId } = req.body;  
      const cart = await deleteCartSingle({ orderId, productId });      
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

  cartRouter.delete( '/deleteCart', async(req, res, next) => {
    try {
      const { orderId } = req.body; 
      const cart = await deleteCart({ orderId });
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

  cartRouter.put('/changeQuantity' , async(req, res, next) => {
    try {
      const { orderId, productId, quantity } = req.body;
      const cart = await updateQuantity({ orderId, productId, quantity })
      res.send(cart)
    } catch(err) {
      next(err);
    }
  });

 cartRouter.get('/:orderId', async (req, res, next) => {
    try {
      const orderId = req.params.orderId
      const order = await getOrderItems({ orderId });
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

module.exports = cartRouter
  // do we need a check out?