const express = require('express');
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
        console.log(error);
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
        // console.log(product);
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.map((item) => {
            console.log('item', item);
            if (id == item._id) {
                item.quantity += 1;

                return item;
            } else {
                return item;
            }
        });

        console.log(newProducts);

        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

// DECREMENT an item in order
router.post('/decrement/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.map((item) => {
            console.log(item);
            if (id == item._id) {
                item.quantity -= 1;

                console.log(item);
                return item;
            } else {
                return item;
            }
        });

        console.log(newProducts);
        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

// DELETE an order item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user!' });
            return;
        }
        const order = await Order.findOne({ userId: req.userId });
        const newProducts = order.products.filter((item) => {
            console.log(item);
            if (id != item._id) {
                return item;
            }
        });

        console.log(newProducts);
        order.products = newProducts;
        await order.save();
        res.status(200).json({ orderList: newProducts });
    } catch (error) {
        console.log(error);
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
        console.log(product);
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
        console.log(error);
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
        console.log(error);
        res.status(500).json({ message: 'Some internal error occured' });
    }
});

module.exports = router;
