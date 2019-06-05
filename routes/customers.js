const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Customers = require('../models/Customer');
const config = require('../config');

module.exports = server => {
    // get customers protected route
    server.get('/customers', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
        try {
            const customers = await Customers.find({});
            res.send(customers);
            next();
        } catch (error) {
            return next(new errors.InvalidArgumentError(error));
        }
    });

        // get single customers
        server.get('/customers/:id', async (req, res, next) => {
            try {
                const customers = await Customers.findById(req.params.id);
                res.send(customers);
                next();
            } catch (error) {
                return next(new errors.ResourceNotFoundError(`No customer with id of ${req.params.id}`));
            }
        });

    // add customer
    server.post('/customers', async (req, res, next) => {
        // check for JSON
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, email, balance } = req.body;
        const customer = new Customers({
            name,
            email,
            balance
        })
        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (error) {
            return next(new errors.InternalError(error.message));
        }
    });

    // Update customers
    server.put('/customers/:id', async (req, res, next) => {
        // check for JSON
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const newCustomer = await Customers.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`No customer with id of ${req.params.id}`));
        }
    });

      // delete customers
      server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customers.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`No customer with id of ${req.params.id}`));
        }
    });
};