/**
 * API client for communicating with the backend server
 * Contains functions for all CRUD operations on products
 */

// Base URL for API requests - would be in .env file in production
const API_URL = 'http://localhost:5000';

/**
 * Fetch all products with optional search filtering
 * @param {string} searchTerm - Optional search term to filter products by name
 * @returns {Promise<Array>} - Promise resolving to array of product objects
 */
export const fetchProducts = async (searchTerm = '') => {
  try {
    // Build URL with search parameters if provided
    const url = searchTerm 
      ? `${API_URL}/products?search=${encodeURIComponent(searchTerm)}` 
      : `${API_URL}/products`;
    
    const response = await fetch(url);
    
    // Check if response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Promise resolving to product object
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product data to create
 * @returns {Promise<Object>} - Promise resolving to created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 * @param {string} id - ID of product to update
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} - Promise resolving to updated product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 * @param {string} id - ID of product to delete
 * @returns {Promise<Object>} - Promise resolving to deletion confirmation
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};