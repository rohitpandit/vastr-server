const express = require('express');
const multer = require('multer');
const imgbbUploader = require('imgbb-uploader');

const router = express.Router();
const { Product } = require('../models/Product');
const upload = multer({ dest: 'uploads/' });

router.get('/:type?', async (req, res) => {
	try {
		const { type } = req.params;
		console.log(type);

		let productList;

		if (type) {
			productList = await Product.find({ category: type });
		} else {
			productList = await Product.find();
		}
		res.status(200).json({ productList: productList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.post('/', upload.single('photo'), async (req, res) => {
	try {
		const { desc, quantity, price, category } = req.body;
		console.log(req.body);
		const photo = req.file;

		const result = await imgbbUploader(process.env.IMGBBSecret, photo.path);
		console.log(result);

		const newProduct = new Product({
			url: result.image.url,
			thumbUrl: result.thumb.url,
			desc: desc,
			price: price,
			quantity: quantity,
			category: category,
		});

		await newProduct.save();
		console.log(result.data);

		res.status(201).json({ message: 'upload successful' });
	} catch (error) {
		console.log('Error', error.message);
		res.status(500).json({ message: 'some internal error occured' });
	}
});

router.get('/single/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);

		const product = await Product.find({ _id: id });
		res.status(200).json({ product: product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured' });
	}
});

module.exports = router;
