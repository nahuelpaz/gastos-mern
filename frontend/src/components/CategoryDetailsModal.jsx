import React from "react";
import { FiX, FiDollarSign, FiCalendar, FiFileText } from "react-icons/fi";

const formatToArgentineDate = (isoDate) => {
  if (!isoDate) return "-";
  const datePart = isoDate.slice(0, 10);
  const parts = datePart.split("-");
  if (parts.length !== 3) return datePart;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

const CategoryDetailsModal = ({ isOpen, onClose, category, expenses }) => {
  if (!isOpen || !category) return null;

  const filteredExpenses = expenses.filter(
    (expense) => (expense.category._id || expense.category) === category._id
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <FiX size={24} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Gastos en {category.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {filteredExpenses.length} {filteredExpenses.length === 1 ? "gasto registrado" : "gastos registrados"}
          </p>
        </div>

        {filteredExpenses.length > 0 ? (
          <div className="max-h-96 overflow-y-auto pr-2">
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div key={expense._id} className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FiFileText className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {expense.description || "Sin descripción"}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                          <span className="flex items-center">
                            <FiDollarSign size={14} className="mr-1" />
                            ${expense.amount.toFixed(2)}
                          </span>
                          <span className="flex items-center">
                            <FiCalendar size={14} className="mr-1" />
                            {formatToArgentineDate(expense.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FiFileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-gray-500 font-medium">No hay gastos registrados</h3>
            <p className="text-gray-400 text-sm mt-1">Los gastos aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailsModal;