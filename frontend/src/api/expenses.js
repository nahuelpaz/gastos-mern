import axios from './axios';

export const getExpenses = () => axios.get('/expenses');
export const createExpense = (data) => axios.post('/expenses', data);
export const updateExpense = (id, data) => axios.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => axios.delete(`/expenses/${id}`);
