import { useState, useEffect } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenses';
import toast from 'react-hot-toast';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (error) {
      setError('Error al cargar gastos');
      console.error(error);
    } finally {
      setLoadingExpenses(false);
    }
  };

  const handleCreateOrUpdateExpense = async (expenseData, editingExpense) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, expenseData);
        toast.success('Gasto actualizado exitosamente');
      } else {
        await createExpense(expenseData);
        toast.success('Gasto creado exitosamente');
      }
      await fetchExpenses();
    } catch (err) {
      const errorMessage = editingExpense ? 'Error al actualizar gasto' : 'Error al crear gasto';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
      toast.success('Gasto eliminado exitosamente');
    } catch (err) {
      const errorMessage = 'Error al eliminar gasto';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loadingExpenses,
    error,
    fetchExpenses,
    handleCreateOrUpdateExpense,
    handleDeleteExpense,
  };
};

export default useExpenses;
