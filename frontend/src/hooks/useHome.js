import { useState, useEffect } from "react";
import { getExpenses } from "../api/expenses";
import { getCategories } from "../api/categories";
import { formatToArgentineDate, isDateInRange, isDateInMonth } from "../utils/homeUtils";

const useHome = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: [],
        startDate: "",
        endDate: "",
        month: new Date().toISOString().slice(0, 7),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [expensesRes, categoriesRes] = await Promise.all([
                    getExpenses(), // Fetch de los gastos
                    getCategories(), // Fetch de las categorías
                ]);
                setExpenses(expensesRes.data); // Guarda los gastos en el estado
                setCategories(categoriesRes.data); // Guarda las categorías en el estado
            } catch (err) {
                setError("Error al cargar datos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const filteredExpenses = expenses
        .map((expense) => ({
            ...expense,
            date: formatToArgentineDate(expense.date),
            timestamp: new Date(expense.date || 0),
        }))
        .filter((expense) => {
            if (
                filters.category.length > 0 &&
                !filters.category.includes(expense.category._id || expense.category)
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

    const filteredChartData = Object.entries(
        filteredExpenses.reduce((acc, expense) => {
            const categoryName =
                categories.find((cat) => cat._id === expense.category._id)?.name ||
                "Sin categoría";
            if (!acc[categoryName]) acc[categoryName] = 0;
            acc[categoryName] += expense.amount;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

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

    const getCategoriesWithExpenses = () => {
        // Filtrar los gastos que están en el mes seleccionado
        const expensesInMonth = expenses.filter((expense) =>
            isDateInMonth(expense.date, filters.month)
        );

        // Obtener los IDs de las categorías con gastos en el mes seleccionado
        const categoryIdsInMonth = new Set(
            expensesInMonth.map((expense) => expense.category._id || expense.category)
        );

        // Retornar solo las categorías que tienen gastos en el mes seleccionado
        return categories.filter((category) =>
            categoryIdsInMonth.has(category._id)
        );
    };

    return {
        expenses,
        categories,
        loading,
        error,
        filters,
        filteredExpenses,
        filteredChartData,
        handleFilterChange,
        getAvailableMonths,
        getCategoriesWithExpenses,
    };
};

export default useHome;
