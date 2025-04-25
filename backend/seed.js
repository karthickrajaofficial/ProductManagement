const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productdb';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


const seedProducts = [
  { name: "Laptop", category: "Electronics", price: 700, inStock: true },
  { name: "Shoes", category: "Fashion", price: 50, inStock: true },
  { name: "Notebook", category: "Stationery", price: 5, inStock: false },
];


const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Database cleared - existing products removed');

    // Insert new products
    await Product.insertMany(seedProducts);
    console.log('Database seeded successfully with', seedProducts.length, 'products');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    // Close database connection when done
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Execute the seeding function
seedDatabase();