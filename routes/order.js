const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
	try {
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user!' });
			return;
		}
		const order = await Order.findOne({ _id: req.userId });
		if (order === null) {
			res.status(200).json({ orderList: [] });
		}
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
		const order = await Order.findOne({ _id: req.userId });
		if (order === null) {
			const newOrder = new Order({
				user: req.userId,
				products: [product],
			});

			await newOrder.save();
			res.status(201).json({ order: newOrder });
		} else {
			order.products = [...order.products, product];
			await order.save();

			res.status(200).json({ order: order });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

module.exports = router;
