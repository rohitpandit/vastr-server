const express = require('express');
const logger = require('../../lib/logger');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        if (order === null) {
            res.status(200).json({ orderList: [] });
        }

        res.status(200).json({ orderList: order.products });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

router.post('/increment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.map((item) => {
            if (id == item._id) {
                item.quantity += 1;

                return item;
            } else {
                return item;
            }
        });

        logger.info(newProducts);

        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

// DECREMENT an item in order
router.post('/decrement/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.map((item) => {
            if (id == item._id) {
                item.quantity -= 1;

                return item;
            } else {
                return item;
            }
        });

        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

// DELETE an order item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.filter((item) => {
            if (id != item._id) {
                return item;
            }
        });

        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const { product } = req.body;
        const order = await Order.findOne({ userId: req.userId });
        if (order == null) {
            const newOrder = new Order({
                userId: req.userId,
                products: [product],
            });

            await newOrder.save();
            res.status(201).json({ orderList: newOrder.products });
        } else {
            order.products = [...order.products, product];
            await order.save();

            res.status(200).json({ orderList: order.products });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

router.patch('/paymentSuccess', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }

        await Order.findOneAndDelete({ userId: req.userId });
        res.status(200).json({ orderList: [] });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

module.exports = router;
