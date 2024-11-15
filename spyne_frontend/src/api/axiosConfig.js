// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://car2-2.onrender.com/api', // adjust to your backend URL
});

export default axiosInstance;
