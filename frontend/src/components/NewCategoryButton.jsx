import React from 'react';
import { FiPlus } from 'react-icons/fi';

const NewCategoryButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
  >
    <FiPlus size={18} />
    Nueva Categoría
  </button>
);

export default NewCategoryButton;
