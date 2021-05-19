const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
	try {
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user!' });
			return;
		}

		const user = await User.findOne({ _id: req.userId });
		res.status(200).json({ user: user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

module.exports = router;
