import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const CategoryActions = ({ category, onEdit, onDelete }) => {
  const isDefault = category.user === null;

  return (
    <div className="flex justify-end space-x-2">
      {isDefault ? (
        <>
          <button 
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 cursor-not-allowed"
            title="Categoría preestablecida, no editable"
          >
            <FiEdit2 size={18} />
          </button>
          <button 
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 cursor-not-allowed"
            title="Categoría preestablecida, no eliminable"
          >
            <FiTrash2 size={18} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onEdit(category)}
            className="p-1 rounded-full text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 transition-colors duration-200"
            title="Editar categoría"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-1 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            title="Eliminar categoría"
          >
            <FiTrash2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryActions;
