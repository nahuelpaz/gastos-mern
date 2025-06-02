import React from 'react';
import { FiPlus } from 'react-icons/fi';
import ExportButton from './ExportButton';

const ExpenseHeader = ({ onCreate, filteredExpenses, filters, categories }) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
    <h1 className="text-2xl font-bold text-gray-800">Gastos</h1>
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <ExportButton
        data={filteredExpenses}
        filters={filters}
        columns={[
          { key: "description", label: "Descripción" },
          { key: "amount", label: "Monto" },
          { key: "categoryName", label: "Categoría" },
          { key: "date", label: "Fecha" },
        ]}
        categories={categories}
      />
      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <FiPlus size={18} />
        Nuevo Gasto
      </button>
    </div>
  </div>
);

export default ExpenseHeader;
