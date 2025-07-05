import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3000',
});

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (data) => api.post('/users/register',data);
export const loginUser = (data) => api.post('/users/login',data);
export const createTransaction = (data) => api.post('/transactions/create',data);
export const getTransactions = (params) => api.get('/transcations',{params});
export const deleteTransaction = (id) => api.get('/transcations/${id}');
export const getSummary = () => api.get('/transcations/summary');
export const uploadReceipt = (file) =>{
    const formData = new FormData();
    return api.post('/transactions/receipt-upload',formData,{
        headers : {'Content-Type' : 'multipart/form-data'},
    });
};

export const uploadPdf = (file) => {
    const formData = new FormData();
    formData.append('pdf',file);
    return api.post('/transcations/pdf-upload',formData,{
        headers : {'Content-Type' : 'multipart/form-data'},
    });
};

export default api;