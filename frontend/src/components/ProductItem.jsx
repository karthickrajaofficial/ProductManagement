import React from 'react';


const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Product Name */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      
      {/* Product Category */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.category}
      </td>
      
      {/* Product Price */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.price.toFixed(2)}
      </td>
      
      {/* In Stock Status */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {product.inStock ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Yes
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            No
          </span>
        )}
      </td>
      
      {/* Action Buttons */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
        <button 
          onClick={() => onEdit(product)} 
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(product._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;