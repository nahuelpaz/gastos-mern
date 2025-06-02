// src/api/categories.js
import axios from './axios'; // o desde donde tengas configurado axios

export const getCategories = () => {
  return axios.get('/categories');
};
