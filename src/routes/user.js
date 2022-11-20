const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
	try {
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user!' });
			return;
		}

		const user = await User.findOne({ _id: req.userId }).select(
			'email name address admin'
		);
		console.log(user);
		res.status(200).json({ user: user });
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

		const { address, name } = req.body;
		const user = await User.findOne({ _id: req.userId });

		if (address) {
			user.address = address;
		}
		if (name) {
			user.name = name;
		}

		await user.save();

		res.status(200).json({ user: user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

module.exports = router;
