const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ message: 'Wrong email or password' });
			return;
		}

		if (user.password !== password) {
			res.status(400).json({ message: 'Wrong email or password' });
			return;
		}

		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ message: 'Some internal error occured!' });
	}
});

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		const user = await User.findOne({ email });
		if (user) {
			res.status(400).json({ message: 'Email not available!' });
			return;
		}

		const newUser = await User({ email, password });
		res.status(201).json({ user: newUser });
	} catch (error) {
		res.status(500).json({ message: 'Some internal error occured!' });
	}
});

module.exports = router;
