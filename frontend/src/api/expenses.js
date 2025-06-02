import axios from './axios';

export const getExpenses = () => axios.get('api/expenses');
export const createExpense = (data) => axios.post('api/expenses', data);
export const updateExpense = (id, data) => axios.put(`api/expenses/${id}`, data);
export const deleteExpense = (id) => axios.delete(`api/expenses/${id}`);
