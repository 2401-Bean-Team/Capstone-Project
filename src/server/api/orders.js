const express = require('express');
const orderRouter = express.Router();

const { createOrder, getCart, updateAddress, updateStatus } = require('../db/order')

// /api/orders
// Middleware for requiring a valid token
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
orderRouter.use(requireToken);

orderRouter.get('/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId
      const order = await getCart({ userId });
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

  orderRouter.post('/newOrder/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId

        const newOrder = await createOrder({
            userId: userId,
            address: '',
            status: true
        });
        res.send(newOrder)
    } catch (error) {
       next(error)
    }
  })

  orderRouter.put('/:orderId/changeAddress', async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const {  address } = req.body;

        const order = await getCart({ userId });
        if (order.length > 0) {
            let updatedOrder = await updateAddress(
                orderId,
                address
            )
            res.send(updatedOrder)
        } else {
            res.status(404).send(`No order found with userId: ${userId}`)
        }
    } catch (error) {
        next(error)
    }
  })

  orderRouter.put('/:orderId/changeStatus', async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

            let updatedOrder = await updateStatus(
                orderId,
                false
            )
            res.send(updatedOrder)
    } catch (error) {
        next(error)
    }
  })

module.exports = orderRouter
