const express = require('express');
const orderRouter = express.Router();

const { createOrder, getOrder, updateAddress, updateStatus } = require('../db/order')

// /api/orders

orderRouter.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
      const order = await getOrder({ userId });
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

  orderRouter.put('/:id/address', async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const {  address } = req.body;

        const order = await getOrder(userId)
        if (order) {
            let updatedOrder = await updateAddress({
                userId,
                address: address, 
            })
            res.send(updatedOrder)
        } else {
            res.status(404).send(`No order found with userId: ${userId}`)
        }
    } catch (error) {
        next(error)
    }
  })

  orderRouter.put('/:id/status', async (req, res, next) => {
    try {
        const userId = req.params.id;  
        const {  status } = req.body;

        const order = await getOrder(userId)
        if (order) {
            let updatedOrder = await updateStatus({
                userId, 
                status: status
            })
            res.send(updatedOrder)
        } else {
            res.status(404).send(`No order found with userId: ${userId}`)
        }
    } catch (error) {
        next(error)
    }
  })

module.exports = orderRouter