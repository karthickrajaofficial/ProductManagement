
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/products', productRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Product Management API - Welcome! Use /products to access the API.');
});

module.exports = app;