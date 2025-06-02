import React, { useState } from "react";
import useHome from "../hooks/useHome";
import HomeHeader from "../components/HomeHeader";
import FilterBar from "../components/FilterBar";
import ChartSection from "../components/ChartSection";
import CategorySummary from "../components/CategorySummary";
import ModalForm from "../components/ModalForm";
import { FaMoneyBillAlt } from 'react-icons/fa';  

const Home = () => {
  const {
    loading,
    error,
    filters,
    filteredExpenses,
    filteredChartData,
    handleFilterChange,
    getAvailableMonths,
    getCategoriesWithExpenses,
    categories, // Importar categorías desde el hook
  } = useHome();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    const categoryExpenses = filteredExpenses.filter(
      (expense) =>
        getCategoriesWithExpenses().find((cat) => cat.name === categoryName)?._id ===
        (expense.category._id || expense.category)
    );
    setSelectedCategory({ name: categoryName, expenses: categoryExpenses });
  };

  const closeCategoryModal = () => setSelectedCategory(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeHeader
        filteredExpenses={filteredExpenses}
        filters={filters}
        categories={categories} // Pasar categorías al header
      />
      <FilterBar
        filters={[
          {
            name: "category",
            label: "Categorías",
            type: "multiselect",
            value: filters.category,
            placeholder: "Seleccionar categorías",
            options: getCategoriesWithExpenses().map((cat) => ({
              value: cat._id,
              label: cat.name,
            })),
          },
          {
            name: "startDate",
            label: "Fecha de Inicio",
            type: "date",
            value: filters.startDate,
            placeholder: "Seleccionar fecha de inicio",
          },
          {
            name: "endDate",
            label: "Fecha de Finalización",
            type: "date",
            value: filters.endDate,
            placeholder: "Seleccionar fecha de finalización",
          },
          {
            name: "month",
            label: "Mes",
            type: "select",
            value: filters.month,
            placeholder: "Todos los meses",
            options: getAvailableMonths().map((month) => ({
              value: month,
              label: month.split("-").reverse().join("-"),
            })),
          },
        ]}
        onFilterChange={handleFilterChange}
      />
      <ChartSection data={filteredChartData} />
      <CategorySummary
        data={filteredChartData}
        onCategoryClick={handleCategoryClick}
      />
      {selectedCategory && (
  <ModalForm
    title={`Detalles de ${selectedCategory.name}`}
    isOpen={!!selectedCategory}
    onClose={closeCategoryModal}
    showActions={false}
  >
    <ul className="divide-y divide-gray-200">
      {selectedCategory.expenses.map((expense) => (
        <li key={expense._id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-green-500 mr-3" />
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>
          </div>
          <span className="font-bold text-red-500">
            ${expense.amount.toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  </ModalForm>
)}
    </div>
  );
};

export default Home;