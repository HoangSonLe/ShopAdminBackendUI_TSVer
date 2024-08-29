import axios, { AxiosInstance } from 'axios'
const API_URL = process.env.REACT_APP_API_URL;
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      withCredentials: true, 
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

// Add a request interceptor to include the token
http.interceptors.request.use(
  (config) => {
      const authModel = JSON.parse(localStorage.getItem('token') || '{}'); // Or retrieve from wherever you're storing the token
      if (authModel.accessToken) {
        config.headers.Authorization = `Bearer ${authModel.accessToken}`; // Attach the accessToken
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);


export default http;