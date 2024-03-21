const express = require('express')
const adminUserRouter = express.Router();

const {
    getAdminUserByName,
    getAdminUser
} = require('../db/users');

const jwt = require('jsonwebtoken')


adminUserRouter.post('/admin', async(req, res, next) => {
    const { name, password } = req.body;
    if(!name || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an name and password for admin'
        });
    }
    try {
        const adminUser = await getAdminUser({name, password});
        if(adminUser) {
            const token = jwt.sign({
                id: adminUser.id,
                name
            }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

adminUserRouter.get('/adminname', async (req, res, next) => {
    try {
        const name = req.query.name; // Access name from query parameters

        const adminUser = await getAdminUserByName(name);

        // Respond with the adminUser data
        res.send({ adminUser });
    } catch (error) {
        next(error);
    }
});

module.exports = adminUserRouter;