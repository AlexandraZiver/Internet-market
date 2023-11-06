import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const $host = axios.create({
  baseURL,
});

const $authHost = axios.create({
  baseURL,
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
