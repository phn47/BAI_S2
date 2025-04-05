var express = require('express');
var router = express.Router();
const Product = require('../schemas/product');
const Category = require('../schemas/category');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Lấy danh sách sản phẩm theo category slug
router.get('/api/:categorySlug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.categorySlug });
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    const products = await Product.find({
      category: category._id,
      isDeleted: false
    }).populate('category');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy chi tiết sản phẩm theo category slug và product slug
router.get('/api/:categorySlug/:productSlug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.categorySlug });
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    const product = await Product.findOne({
      slug: req.params.productSlug,
      category: category._id,
      isDeleted: false
    }).populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
