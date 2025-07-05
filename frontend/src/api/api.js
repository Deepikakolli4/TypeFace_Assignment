import axios from 'axios';
import { urls } from '../constants/constants';
//add to env
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post(urls.register, data);
export const loginUser = (data) => api.post(urls.login, data);
export const createTransaction = (data) => api.post(urls.create, data);
export const getTransactions = (params) => api.get(urls.get, { params });

export const deleteTransaction = (id) => api.delete(urls.delete(id));

export const getSummary = () => api.get(urls.summary);

export const uploadReceipt = (file) => {
  const formData = new FormData();
  formData.append('receipt', file);
  return api.post(urls.receiptUpload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadPdf = (file) => {
  const formData = new FormData();
  formData.append('pdf', file);
  return api.post(urls.pdfUpload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};