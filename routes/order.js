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

router.post('/increment/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user!' });
			return;
		}
		console.log(product);
		const order = await Order.findOne({ userId: req.userId });
		const newProducts = order.products.map((item) => {
			if (id === item._id) {
				item.quantity += 1;
				return item;
				s;
			} else {
				return item;
			}
		});

		order.products = newProducts;
		await order.save();
		res.status(200).json({ orderList: newProducts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

router.post('/decrement/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user!' });
			return;
		}
		console.log(product);
		const order = await Order.findOne({ userId: req.userId });
		const newProducts = order.products.map((item) => {
			if (id === item._id) {
				item.quantity -= 1;
				return item;
				s;
			} else {
				return item;
			}
		});

		order.products = newProducts;
		await order.save();
		res.status(200).json({ orderList: newProducts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

module.exports = router;
