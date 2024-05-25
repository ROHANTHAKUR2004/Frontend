import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "https://crma-pp-backend.vercel.app/crmapp/api/v1";
axiosInstance.defaults.timeout = import.meta.env.VITE_API_TIMEOUT;


export default axiosInstance;

