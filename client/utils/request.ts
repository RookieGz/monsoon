import axios, { AxiosPromise } from "axios";

const request = axios.create({
  timeout: 18 * 1000,
  timeoutErrorMessage: "接口请求超时",
  baseURL: typeof window === "undefined" ? "http://localhost:6001/api" : "/api",
});

request.interceptors.response.use(
  (resopnse) => resopnse,
  (error) => {
    console.error(error.response?.status, error.response?.data || error);
    return error;
  }
);

export default request;