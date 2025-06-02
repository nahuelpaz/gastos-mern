import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FF6B6B",
  "#4ECDC4",
  "#FFA07A",
  "#20B2AA",
];

const CategorySummary = ({ data, onCategoryClick }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resumen por Categoría</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((category, index) => (
          <div
            key={category.name}
            className="relative p-3 rounded-lg border-l-4"
            style={{
              borderLeftColor: COLORS[index % COLORS.length],
              backgroundColor: `${COLORS[index % COLORS.length]}20`,
            }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-blue-600"
              onClick={() => onCategoryClick && onCategoryClick(category.name)}
            >
              <FiArrowUpRight />
            </button>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-lg">${category.value.toFixed(2)}</p>
            <p className="text-sm text-gray-600">
              {((category.value / total) * 100).toFixed(0)}% del total
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
