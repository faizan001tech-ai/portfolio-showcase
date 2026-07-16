import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Debug: Print the actual API URL being used
console.log('🔧 API Configuration Debug:');
console.log('  VITE_API_URL:', API_URL);
console.log('  baseURL:', API_URL);

if (!API_URL) {
  console.error('❌ CRITICAL: VITE_API_URL is not defined!');
  console.error('   Please set VITE_API_URL in your environment variables.');
  console.error('   For production, this should be your Render backend URL (e.g., https://your-api.onrender.com/api)');
  console.error('   For local development, this should be http://localhost:5000/api');
}

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
