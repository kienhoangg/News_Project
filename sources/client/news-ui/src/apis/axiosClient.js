import axios from 'axios';
import queryString from 'query-string';
import commonFunc from 'common/commonFunc';
import { openNotification } from 'helpers/notification';
import { NotificationType } from 'common/enum';
import routes from 'config/configRoutes';
const axiosClient = axios.create({
  baseURL: 'https://localhost:7122/api/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  const token = commonFunc.getCookie('token');
  const pathName = window.location.pathname;
  if (!token && pathName !== routes.login && pathName.startsWith('/admin/')) {
    openNotification('Hết phiên đăng nhập', '', NotificationType.ERROR);
    setTimeout(() => {
      window.open(routes.login, '_self');
    }, 1000);
    return;
  }
  config.headers.Authorization = `Bearer ${token}`;
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
    throw error;
  }
);
export default axiosClient;
