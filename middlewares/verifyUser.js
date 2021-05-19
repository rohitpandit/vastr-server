const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
	try {
		if (req.headers['authorization']) {
			console.log(req.headers);
			const token = req.headers['authorization'].split(' ')[1];
			const verify = jwt.verify(token, process.env.JWTSecret);
			if (verify) {
				req.userId = verify._id;
				// console.log(verify._id);
			}
		}
	} catch (error) {
		res.status(401).json({ message: 'unauthorized user' });
	}
	next();
};

module.exports = verifyUser;
