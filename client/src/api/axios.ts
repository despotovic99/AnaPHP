import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length':0
  }
});

export default axiosInstance;
