import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './api';


function App() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

 
  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async (searchTerm = '') => {
    setLoading(true);
    try {
      const data = await fetchProducts(searchTerm);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (productData) => {
    setLoading(true);
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct._id, productData);
        setEditingProduct(null);
      } else {
        // Create new product
        await createProduct(productData);
      }
     
      await loadProducts();
      setError(null);
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };


  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await deleteProduct(productId);
        // Reload products list to reflect deletion
        await loadProducts();
        setError(null);
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSearch = (searchTerm) => {
    loadProducts(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Product Management System</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-grow">

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {/* Content container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form section */}
          <section className="w-full md:w-1/3">
            <ProductForm 
              onSubmit={handleProductSubmit} 
              initialData={editingProduct}
              onCancel={handleCancelEdit}
            />
          </section>
          
          {/* List section */}
          <section className="w-full md:w-2/3">
            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            ) : (
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onSearch={handleSearch}
              />
            )}
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Product Management System &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;