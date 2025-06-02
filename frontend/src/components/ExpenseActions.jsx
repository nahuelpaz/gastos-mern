import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ExpenseActions = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => onEdit(expense)}
        className="p-1 rounded-full text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 transition-colors duration-200"
        title="Editar gasto"
      >
        <FiEdit2 size={18} />
      </button>
      <button
        onClick={() => onDelete(expense._id)}
        className="p-1 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
        title="Eliminar gasto"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

export default ExpenseActions;
