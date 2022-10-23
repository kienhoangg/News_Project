import axios from 'axios';
import queryString from 'query-string';
import commonFunc from 'common/commonFunc';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7122/api/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers.Authorization = `Bearer ${commonFunc.getCookie('token')}`;
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
