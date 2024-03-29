const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken'); 
const { getUserById } = require( '../db/users')
const { JWT_SECRET } = process.env;

const volleyball = require('volleyball')
apiRouter.use(volleyball)

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  }
  else if (auth.startsWith(prefix)) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const { id } = parsedToken 
      console.log('parsed token: ', parsedToken) 
      console.log('user id:', id);

      if (id) {
        req.user = await getUserById({ id });
        console.log('req.user:', req.user);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  }
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const adminUserRouter = require('./adminUser');
apiRouter.use('/adminUser', adminUserRouter);

const adminPageRouter = require('./adminPage');
apiRouter.use('/adminpage', adminPageRouter);

apiRouter.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err)
  })

  apiRouter.get('/', (req, res) => {
    res.send('In the /api routes')
  })

  apiRouter.use('/products', require('./products'))

  apiRouter.use('/orders', require ('./orders'))

  apiRouter.use('/cart', require('./order_product'))
 

module.exports = apiRouter;

