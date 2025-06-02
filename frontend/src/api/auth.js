import axios from './axios';

export const registerUser = (data) => axios.post('/auth/register', data);
export const loginUser = (data) => axios.post('/auth/login', data);
