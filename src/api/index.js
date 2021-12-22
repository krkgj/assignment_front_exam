import axios from "axios";
import setInterceptors from "@/api/interceptor";

const API_BASE_URL = "http://localhost:9090";

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    withCredentials: true,
  });
  return setInterceptors(instance);
  // return instance;
}

const axiosInstance = createInstance();

export default axiosInstance;
