const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(400).json({ message: 'Wrong email or password' });
			return;
		}

		const passwordCheck = await bcrypt.compare(password, user.password);

		if (!passwordCheck) {
			res.status(400).json({ message: 'Wrong email or password' });
			return;
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);

		res.status(200).json({ token: token, admin: user.admin });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured!' });
	}
});

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);

		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		let user = await User.findOne({ email: email });
		if (user !== null) {
			res.status(400).json({ message: 'Email not available!' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User({ email, password: hashedPassword });
		await newUser.save();

		const token = jwt.sign({ _id: newUser._id }, process.env.JWTSECRET);

		res.status(200).json({ token: token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured!' });
	}
});

module.exports = router;
