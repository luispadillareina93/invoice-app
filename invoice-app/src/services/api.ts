// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://192.168.1.29:5236/api/invoice-service',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
