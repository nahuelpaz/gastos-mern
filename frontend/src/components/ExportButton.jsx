import React from "react";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import toast from "react-hot-toast"; // Importar react-hot-toast

const ExportButton = ({ data, filters, columns, categories }) => {
  const generateFileName = (extension) => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        if (key === "category") {
          // Manejar múltiples categorías seleccionadas
          const categoryNames = value
            .map((categoryId) => {
              const category = categories.find((cat) => cat._id === categoryId);
              return category ? category.name : categoryId; // Usar nombre o ID como fallback
            })
            .join("-");
          return `${key}-${categoryNames}`;
        }
        return `${key}-${value}`;
      })
      .join("_");
    return `reporte_gastos${activeFilters ? `_${activeFilters}` : ""}.${extension}`;
  };

  const exportToXLSX = () => {
    const worksheetData = [
      columns.map((col) => col.label), // Headers
      ...data.map((row) => columns.map((col) => row[col.key] || "")), // Rows
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");

    const fileName = generateFileName("xlsx");
    XLSX.writeFile(workbook, fileName);

    // Mostrar notificación de éxito
    toast.success("Archivo descargado exitosamente");
  };

  return (
    <div>
      <button
        onClick={exportToXLSX}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <FiDownload size={18} />
        Exportar XLSX
      </button>
    </div>
  );
};

export default ExportButton;
