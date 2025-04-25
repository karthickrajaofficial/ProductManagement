
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let query = {};
    
    // If search query provided, filter products by name (case-insensitive)
    if (searchQuery) {
      query = { name: { $regex: searchQuery, $options: 'i' } };
    }
    
    // Find products based on query
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    // Return 404 if product not found
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  // Create new product instance with request body
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true
  });

  try {
    // Save to database
    const newProduct = await product.save();
    // Return created product with 201 status
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Update only the fields that are provided in the request
    if (req.body.name) product.name = req.body.name;
    if (req.body.category) product.category = req.body.category;
    if (req.body.price !== undefined) product.price = req.body.price;
    if (req.body.inStock !== undefined) product.inStock = req.body.inStock;
    
    // Save updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Delete the product
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;