import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Change if needed

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data;
};

export const registerUser = async (email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, { email, password });
  return data;
};

export const getSummary = async () => {
  const { data } = await axios.get(`${API_URL}/analytics/summary`);
  return data;
};

export const getTrends = async (filters: any = {}) => {
  const params = { ...filters, groupBy: 'month' };
  const { data } = await axios.get(`${API_URL}/analytics/trends`, { params });
  return data;
};

export const getTransactions = async (params: any) => {
  const { data } = await axios.get(`${API_URL}/transactions`, { params });
  return data;
};

export const addTransaction = async (tx: any) => {
  const { data } = await axios.post(`${API_URL}/transactions`, tx);
  return data;
};

export const exportCSV = async (filters: any, columns: string[]) => {
  const res = await axios.post(`${API_URL}/export`, { filters, columns }, { responseType: 'blob' });
  return res.data;
}; 