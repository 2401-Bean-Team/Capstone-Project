const express = require('express')
const adminPageRouter = express.Router();
const { createProduct, getProducts, getProductById, editProduct, deleteProduct } = require('../db/product')

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
  adminPageRouter.use(requireToken);
  
  adminPageRouter.get('/', async (req, res, next) => {
    try {
      const coffee = await getProducts();
      res.send(coffee);
    } catch(err) {
      next(err);
    }
  });

  adminPageRouter.get('/:productId', async (req, res, next) => {
    try {
      const productId = req.params.productId;
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

  adminPageRouter.post('/newproduct', async (req, res, next) => {
  try {
    const newProductData = req.body;
    const newProduct = await createProduct(newProductData);
      res.send(newProduct)
    } catch (err) {
       next(err);
    }

  });

  adminPageRouter.delete('/deleteproduct/:productId', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      await deleteProduct(productId) 
      res.send("Product deleted successfully");       
    } catch (err) {
        next(err);
    }
  });

  adminPageRouter.put('/editproduct', async (req, res, next) => {
    try {
      const editProductData = req.body
      const editProduct = await editProduct(editProductData);
      res.send(editProduct)  
    } catch (err) {
        next(err);
    }
  });

  module.exports = adminPageRouter