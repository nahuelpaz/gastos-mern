import React, { useEffect, useState } from "react";
import { getCategories } from "../api/categories";
import Table from "../components/Table";
import FilterBar from "../components/FilterBar";
import toast from "react-hot-toast";
import ExpenseFormModal from "../components/ExpenseFormModal";
import ExpenseActions from "../components/ExpenseActions";
import useExpenses from "../hooks/useExpenses";
import {
  formatToArgentineDate,
  isDateInRange,
  isDateInMonth,
} from "../utils/dateUtils";
import ExpenseHeader from "../components/ExpenseHeader";
import TotalExpenses from "../components/TotalExpenses";

const Expense = () => {
  const {
    expenses,
    loadingExpenses,
    error,
    handleCreateOrUpdateExpense,
    handleDeleteExpense,
  } = useExpenses();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [filters, setFilters] = useState({
    category: [],
    startDate: "",
    endDate: "",
    month: new Date().toISOString().slice(0, 7),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
      if (res.data.length > 0 && !editingExpense) {
        setFormData((f) => ({ ...f, category: res.data[0]._id }));
      }
    } catch (error) {
      toast.error("Error al cargar categorías");
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const openModalForCreate = () => {
    setEditingExpense(null);
    setFormData({
      description: "",
      amount: "",
      category: categories.length > 0 ? categories[0]._id : "",
      date: new Date().toISOString().slice(0, 10),
    });
    setModalOpen(true);
  };

  const openModalForEdit = (expense) => {
    setEditingExpense(expense);

    // Validar si expense.date es válido antes de convertirlo
    const formattedDate =
      expense.timestamp && !isNaN(expense.timestamp.getTime())
        ? expense.timestamp.toISOString().slice(0, 10)
        : "";

    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category._id || expense.category,
      date: formattedDate, // Asegurarse de que la fecha esté en formato ISO o vacía
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingExpense(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { description, amount, category, date } = formData;

    if (!description || !amount || !category || !date) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      toast.error("No se puede seleccionar una fecha futura");
      return;
    }

    // Asegurarse de enviar la fecha en formato ISO al backend
    await handleCreateOrUpdateExpense(
      {
        description,
        amount: Number(amount),
        categoryId: category,
        date: selectedDate.toISOString(), // Enviar la fecha en formato ISO completo
      },
      editingExpense
    );
    closeModal();
  };

  const handleFilterChange = (name, value) => {
    if (name === "category") {
      const currentCategories = filters.category || [];
      const newCategories = currentCategories.includes(value)
        ? currentCategories.filter((cat) => cat !== value)
        : [...currentCategories, value];
      setFilters((prev) => ({ ...prev, [name]: newCategories }));
    } else if (name === "month") {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        category: [],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getCategoriesWithExpenses = () => {
    const categoryIdsWithExpenses = new Set(
      expenses
        .filter((expense) => isDateInMonth(expense.date, filters.month))
        .map((expense) => expense.category?._id || expense.category)
    );
    return categories.filter((category) =>
      categoryIdsWithExpenses.has(category._id.toString())
    );
  };

  const getAvailableMonths = () => {
    const uniqueMonths = new Set(
      expenses.map((expense) => {
        const date = new Date(expense.date);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        return `${year}-${String(month).padStart(2, "0")}`;
      })
    );
    return Array.from(uniqueMonths).sort((a, b) => new Date(a) - new Date(b));
  };

  if (loadingCategories || loadingExpenses)
    return <div className="text-center py-8">Cargando gastos...</div>;

  const mappedExpenses = expenses
    .map((expense) => {
      const categoryName =
        typeof expense.category === "string"
          ? categories.find((c) => c._id === expense.category)?.name ||
            "Sin categoría"
          : expense.category?.name || "Sin categoría";

      return {
        ...expense,
        categoryName,
        date: formatToArgentineDate(expense.date),
        timestamp: new Date(expense.date || 0),
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const filteredExpenses = mappedExpenses.filter((expense) => {
    if (
      filters.category.length > 0 &&
      !filters.category.includes(expense.category?._id || expense.category)
    ) {
      return false;
    }
    if (!isDateInRange(expense.timestamp, filters.startDate, filters.endDate)) {
      return false;
    }
    if (!isDateInMonth(expense.timestamp, filters.month)) {
      return false;
    }
    return true;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <ExpenseHeader
        onCreate={openModalForCreate}
        filteredExpenses={filteredExpenses}
        filters={filters}
        categories={categories}
      />

      <FilterBar
        filters={[
          {
            name: "category",
            label: "Categorías",
            type: "multiselect",
            value: filters.category,
            placeholder: "Seleccionar",
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

      {error && !modalOpen && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay gastos registrados
        </div>
      ) : (
        <div>
          <Table
            columns={[
              { key: "description", label: "Descripción", bold: true },
              {
                key: "amount",
                label: "Monto",
                format: (value) =>
                  `$${parseFloat(value).toLocaleString("es-AR")}`,
              },
              { key: "categoryName", label: "Categoría" },
              { key: "date", label: "Fecha" },
            ]}
            data={filteredExpenses}
            actions={(expense) => (
              <ExpenseActions
                expense={expense}
                onEdit={openModalForEdit}
                onDelete={handleDeleteExpense}
              />
            )}
          />
          <TotalExpenses total={totalExpenses} />
        </div>
      )}

      <ExpenseFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={{ ...formData, categories }}
        setFormData={setFormData}
        error={error}
        editingExpense={editingExpense}
      />
    </div>
  );
};

export default Expense;
