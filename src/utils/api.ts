import axios from "axios";
import API_URL from "../config/APIUrl";
import { store } from "../store/configureStore";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

console.log(API_URL)

api.interceptors.request.use(
  (config) => {
    const token = store.getState().account.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
