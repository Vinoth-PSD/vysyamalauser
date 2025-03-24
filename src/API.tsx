// src/api.tsx
import axios from 'axios';
import config from './Config'; // Import the configuration

const apiClient = axios.create({
  baseURL: config.apiUrl, // Use the base URL from config
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
