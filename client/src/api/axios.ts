import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axiosInstance;
