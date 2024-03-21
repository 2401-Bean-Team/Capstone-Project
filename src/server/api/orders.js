const express = require('express');
const orderRouter = express.Router();

const { createOrder, getOrder, updateAddress, updateStatus } = require('../db/order')

// /api/orders

orderRouter.get('/myCart', async (req, res, next) => {
    try {
        const userId = req.user.id
      const order = await getCart({ userId });
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

  orderRouter.post('/newOrder', async (req, res, next) => {
    try {
        const { userId, address, status } = req.body;
        if (!userId || !address || !status) {
            return res.status(400).send("Missing required fields");
        }

        const newOrder = await createOrder({ userId, address, status });
        res.send(newOrder)
    } catch (error) {
       next(error) 
    }
  })

  orderRouter.put('/:orderId/changeAddress', async (req, res, next) => {
    try {
        const orderId = req.params.orderId; 
        const {  address } = req.body;

        const order = await getOrder({ orderId });
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
        const {  status } = req.body;

        const order = await getOrder({ orderId });
        if (order.length > 0) {
            let updatedOrder = await updateStatus(
                orderId,
                status
            )
            res.send(updatedOrder)
        } else {
            res.status(404).send(`No order found with userId: ${userId}`)
        }
    } catch (error) {
        next(error)
    }
  })

module.exports = orderRouter