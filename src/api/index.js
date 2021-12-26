import axios from "axios";
import setInterceptors from "@/api/interceptor";

// const API_BASE_URL = "http://220.73.45.183:9790";
const API_BASE_URL = "http://localhost:9790";
// const API_BASE_URL = "http://112.170.199.127:9790";
// const API_BASE_URL = "http://localhost:9690";

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
