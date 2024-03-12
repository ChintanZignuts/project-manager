import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_API_URL;

axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] = import.meta.env.VITE_API_API_KEY;
  return config;
});

export default axios;
