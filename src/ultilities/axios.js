import axios from "axios";
import { AsyncStorage } from "react-native";

const API_URL = process.env.API_URL || "http://localhost:8080"

const baseApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

baseApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Promise.reject(error)
})

baseApi.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  Promise.reject(error)
})


export default baseApi;