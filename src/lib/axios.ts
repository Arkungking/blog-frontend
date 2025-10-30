import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});
export const axiosInstance2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API2,
});
