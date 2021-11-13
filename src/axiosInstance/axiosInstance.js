import axios from 'axios'
import { baseUrl } from '../utils/baseUrls'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

    // 'Content-Type': 'application/json, charset=utf-8',
    // 'Access-Control-Allow-Methods': 'DELETE, POST, GET,PUT, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axiosInstance
