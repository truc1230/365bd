import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {
    // Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const accessToken = loadAccessToken();
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
