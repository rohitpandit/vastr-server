const express = require('express');
const multer = require('multer');
const imgbbUploader = require('imgbb-uploader');

const router = express.Router();
const { Product } = require('../models/Product');
const upload = multer({ dest: 'uploads/' });

router.get('/single/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findOne({ _id: id });
		res.status(200).json({ product: product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some internal error occured' });
	}
});

// Increment in product
router.post('/increment/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findOne({ _id: id });

		product.quantity += 1;

		await product.save();

		const productList = await Product.find();
		res.status(200).json({ productList: productList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

// DECREMENT an item in product
router.post('/decrement/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findOne({ _id: id });

		product.quantity -= 1;

		await product.save();

		const productList = await Product.find();
		res.status(200).json({ productList: productList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

// DELETE an product item
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		await Product.deleteOne({ _id: id });

		const productList = await Product.find();
		res.status(200).json({ productList: productList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some internal error occured' });
	}
});

router.get('/:type?', async (req, res) => {
	try {
		const { type } = req.params;

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

		const photo = req.file;

		const result = await imgbbUploader(process.env.IMGBBSecret, photo.path);

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

module.exports = router;
