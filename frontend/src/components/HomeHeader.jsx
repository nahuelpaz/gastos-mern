import React from "react";
import ExportButton from "./ExportButton";

const HomeHeader = ({ filteredExpenses, filters, categories }) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
    <h1 className="text-2xl font-bold text-gray-800">Dashboard de Gastos</h1>
    <ExportButton
      data={filteredExpenses}
      filters={filters}
      columns={[
        { key: "description", label: "Descripción" },
        { key: "amount", label: "Monto" },
        { key: "categoryName", label: "Categoría" },
        { key: "date", label: "Fecha" },
      ]}
      categories={categories} // Pasar categorías al botón de exportar
    />
  </div>
);

export default HomeHeader;
